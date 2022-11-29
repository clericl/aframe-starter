const proximityTriggerComponent = {
  schema: {
    threshold: { default: 13 }
  },
  init() {
    this.worldPosition = new THREE.Vector3()
    this.cameraPosition = new THREE.Vector3()
    this.camera = document.getElementById('camera')

    this.inProximity = false

    this.handleEnteredProximity = this.handleEnteredProximity.bind(this)
    this.handleExitedProximity = this.handleExitedProximity.bind(this)

    this.el.addEventListener('enteredproximity', this.handleEnteredProximity)
    this.el.addEventListener('exitedproximity', this.handleExitedProximity)
  },
  tick() {
    if (this.camera) {
      const thresholdSquared = Math.pow(this.data.threshold, 2)
      this.el.object3D.getWorldPosition(this.worldPosition)
      this.camera.object3D.getWorldPosition(this.cameraPosition)

      const compA = new THREE.Vector3(this.worldPosition.x, 0, this.worldPosition.z)
      const compB = new THREE.Vector3(this.cameraPosition.x, 0, this.cameraPosition.z)

      if (compA.distanceToSquared(compB) < thresholdSquared) {
        if (!this.inProximity) {
          this.el.emit('enteredproximity', { el: this.el })
        }
      } else {
        if (this.inProximity) {
          this.el.emit('exitedproximity', { el: this.el })
        }
      }
    } else {
      this.camera = document.getElementById('camera')
    }
  },
  handleEnteredProximity({ el }) {
    if (el === this.el) {
      this.inProximity = true
    }
  },
  handleExitedProximity({ el }) {
    if (el === this.el) {
      this.inProximity = false
    }
  },
}

export default proximityTriggerComponent
