/**
 * A component to attach a "ghosted" image to the positioning cursor as a
 * visual aid. Specific to this video-based experience; model-based
 * experiences will require a revision to instantiate the model and adjust its
 * materials as necessary.
 * 
 * @property {selector} thumbSrc A selector for a video thumbnail to use as the ghost image.
 */

const ghostModelComponent = {
  schema: {
    thumbSrc: { type: 'selector' },
  },
  init() {
    this.ghost = document.createElement('a-entity')
    this.ghost.setAttribute('id', 'ghost')
    this.ghost.setAttribute('camera-tracker', '')

    // make sure to adjust width and height to fit your video aspect ratio
    this.ghost.setAttribute('geometry', {
      primitive: 'plane',
      width: 6.84,
      height: 12.96,
    })
    this.ghost.setAttribute('material', {
      transparent: true,
      shader: 'flat',
      opacity: 0.5,
      src: this.data.thumbSrc,
    })

    this.el.appendChild(this.ghost)
  },
  update() {
    this.ghost.setAttribute('material', { src: this.data.thumbSrc })
  },
  remove() {
    this.ghost.parentElement.removeChild(this.ghost)
  },
}

export default ghostModelComponent
