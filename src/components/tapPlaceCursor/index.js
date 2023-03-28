/**
 * A component that adds a positioning cursor to the scene. The user may tap
 * the ground plane to lock the cursor on a given position ("placement").
 * 
 * @property {boolean} active Whether the cursor is actively raycasting and listening to touch events.
 * 
 * @fires cursorplaced
 */

const Y_OFFSET = 0.1

const tapPlaceCursorComponent = {
  schema: {
    active: { default: false },
  },
  init() {
    // Set the pinch-scale component from 8th Wall xrextras. The user may
    // change the cursor scale, using two-finger gestures, and the placed
    // model will also receive the altered scale.
    this.el.setAttribute('pinch-scale', '')

    this.camera = document.getElementById('camera')

    this.raycaster = new THREE.Raycaster()
    this.threeCamera = camera.getObject3D('camera')
    this.ground = document.getElementById('ground')

    // 2D coordinates of the raycast origin, in normalized device coordinates (NDC)---X and Y
    // components should be between -1 and 1.  Here we want the cursor in the center of the screen.
    this.rayOrigin = new THREE.Vector2(0, 0)
    this.cursorLocation = new THREE.Vector3(0, 0, 0)
    
    this.handleClick = this.handleClick.bind(this)
    this.handleCursorPlaced = this.handleCursorPlaced.bind(this)
    this.reposition = this.reposition.bind(this)

    this.el.sceneEl.addEventListener('click', this.handleClick)
    this.el.sceneEl.addEventListener('cursorplaced', this.handleCursorPlaced)
    this.ground.addEventListener('click', this.reposition)
  },
  tick() {
    const { active } = this.data

    if (active) {
      // Raycast from camera to 'ground'
      this.raycaster.setFromCamera(this.rayOrigin, this.threeCamera)
      const intersects = this.raycaster.intersectObject(this.ground.object3D, true)
      if (intersects.length > 0) {
        const [intersect] = intersects
        this.cursorLocation = intersect.point
      }
      this.el.object3D.position.y = Y_OFFSET
      this.el.object3D.position.lerp(this.cursorLocation, 0.4)
      this.el.object3D.rotation.y = this.threeCamera.rotation.y
    }
  },
  remove() {
    this.el.sceneEl.removeEventListener('click', this.handleClick)
    this.el.sceneEl.removeEventListener('cursorplaced', this.handleCursorPlaced)
    this.ground.removeEventListener('click', this.reposition)
  },
  handleClick() {
    if (this.data.active) {
      const { position } = this.el.object3D
      this.el.sceneEl.emit('cursorplaced', { position })
    }
  },
  handleCursorPlaced() {
    this.el.setAttribute('tap-place-cursor', { active: false })
    
    // Add raycaster to camera
    this.camera.setAttribute('raycaster', 'objects: .cantap')
    this.camera.setAttribute('cursor', 'fuse: false; rayOrigin: mouse;')
  },
  reposition(event) {
    const { detail } = event
    if (this.hasPlacedModel) {
      this.el.object3D.position.set(
        detail.intersection.point.x,
        detail.intersection.point.y + Y_OFFSET,
        detail.intersection.point.z,
      )
    }
  },
}

/**
 * The cursor has been instructed to lock on a position.
 * 
 * @event cursorplaced
 * @type {object}
 * @property {Vector3} position The marked position.
 */

export default tapPlaceCursorComponent
