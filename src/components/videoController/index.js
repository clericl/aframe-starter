/**
 * A component to attach an alpha video to an entity.
 * 
 * @property {selector} videoSrc The CSS selector that identifies the target video.
 */

export const videoControllerComponent = {
  schema: {
    videoSrc: { type: 'selector' },
  },
  init() {
    this.initVideo = this.initVideo.bind(this)

    this.videoEl = document.createElement('a-entity')
    this.videoEl.setAttribute('id', 'video-el')
    this.videoEl.setAttribute('camera-tracker', '')
    this.videoEl.setAttribute('visible', false)

    this.el.appendChild(this.videoEl)
  },
  /**
   * When a video element is passed into state, initialize a video entity to
   * play it.
   */
  update() {
    const { videoSrc } = this.data
    
    videoSrc.currentTime = 0.01
    videoSrc.play()

    // Wait until the video data is playable to avoid black loading frames.
    if (videoSrc.readyState > 2) {
      this.initVideo()
    } else {
      videoSrc.addEventListener('canplay', this.initVideo)
    }
  },
  remove() {
    if (this.videoEl && this.videoEl.parentElement) {
      this.videoEl.parentElement.removeChild(this.videoEl)
    }
  },
  /**
   * Initialize a chromakey shader material with the desired video texture.
   */
  initVideo() {
    const { videoSrc } = this.data

    videoSrc.removeEventListener('canplay', this.initVideo)

    const currentMesh = this.videoEl.getObject3D('mesh')
    if (currentMesh) {
      this.videoEl.removeObject3D('mesh')
    }
    
    const geometry = new THREE.PlaneGeometry(6.84, 12.96)
    const newMesh = new THREE.Mesh(geometry, this.system.materials[videoSrc.id])
    this.videoEl.setObject3D('mesh', newMesh)

    this.videoEl.setAttribute('visible', true)
  },
}

/**
 * A system that pregenerates materials using the identified video textures to
 * avoid black loading frames.
 */
export const videoControllerSystem = {
  init() {
    this.materials = {}
    
    this.createMaterial = this.createMaterial.bind(this)

    const allVideos = document.querySelectorAll('.video-asset')
    for (const video of allVideos) {
      this.materials[video.id] = this.createMaterial(video)
    }
  },
  createMaterial(video) {
    const videoTexture = new THREE.VideoTexture(video)
    videoTexture.minFilter = THREE.LinearFilter

    return new THREE.ShaderMaterial({
      uniforms: {
        color: {
          type: 'c',
          value: {x: 0, y: 1, z: 0},
        },
        tex: {
          type: 't',
          value: videoTexture,
        },
      },
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      transparent: true,
      opacity: 1,
      depthTest: true,
      alphaTest: 0.5,
    })
  },
  vertexShader:
  `
    varying vec2 vUv;
    void main(void)
    {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader:
  `
    uniform sampler2D tex;
    uniform vec3 color;
    varying vec2 vUv;

    vec2 RGBToCC(vec4 rgba) {
        float Y = 0.299 * rgba.r + 0.587 * rgba.g + 0.114 * rgba.b;
        return vec2((rgba.b - Y) * 0.565, (rgba.r - Y) * 0.713);
    }

    vec2 RGBtoUV(vec3 rgb) {
      return vec2(
        rgb.r * -0.169 + rgb.g * -0.331 + rgb.b *  0.5    + 0.5,
        rgb.r *  0.5   + rgb.g * -0.419 + rgb.b * -0.081  + 0.5
      );
    }

    vec4 OldChromaKey(void) {
      vec3 tColor = texture2D( tex, vUv ).rgb;
      float a = (length(tColor - color) - 0.5) * 7.0;
      return vec4(tColor, a);
    }

    vec4 ProcessChromaKey() {
      float similarity = 0.4;
      float smoothness = 0.1;
      float spill = 0.1;
      vec4 rgba = texture2D(tex, vUv);
      float chromaDist = distance(RGBtoUV(texture2D(tex, vUv).rgb), RGBtoUV(color));

      float baseMask = chromaDist - similarity;
      float fullMask = pow(clamp(baseMask / smoothness, 0., 1.), 1.5);
      rgba.a = fullMask;

      float spillVal = pow(clamp(baseMask / spill, 0., 1.), 1.5);
      float desat = clamp(rgba.r * 0.2126 + rgba.g * 0.7152 + rgba.b * 0.0722, 0., 1.);
      rgba.rgb = mix(vec3(desat, desat, desat), rgba.rgb, spillVal);

      return rgba;
    }

    void ChromaKeyCC(void) {
      vec3 tColor = texture2D( tex, vUv ).rgb;
      vec4 keyColor = vec4(color, 1.0);
      vec4 src1Color = vec4(tColor, 1.0);
      vec2 CC = RGBToCC(src1Color);
      vec2 keyCC = RGBToCC(keyColor);
      vec2 range = vec2(0.11, 0.22);
      float mask = sqrt(pow(keyCC.x - CC.x, 2.0) + pow(keyCC.y - CC.y, 2.0));
      if (mask == 0.0) { discard; }
      else if (mask == 1.0) { gl_FragColor = src1Color; }
      else { gl_FragColor = max(src1Color - (1.0 - mask) * keyColor, 0.0); }
    }

    void main(void)
    {
      gl_FragColor = ProcessChromaKey();
      // ChromaKeyCC()
      // gl_FragColor = OldChromaKey()
    }
  `
}
