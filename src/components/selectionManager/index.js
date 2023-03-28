/**
 * A component to manage the current selection from the carousel and initiate
 * any related behaviors.
 * 
 * @property {number} selected The current selected carousel item index.
 */

const selectionManagerComponent = {
  schema: {
    selected: { default: 0 }
  },
  init() {
    this.videoEl = null

    this.camera = document.getElementById('camera')
    this.cursor = document.getElementById('cursor')
    this.ghost = document.getElementById('ghost')

    this.handleCarouselChanged = this.handleCarouselChanged.bind(this)
    this.handleCursorPlaced = this.handleCursorPlaced.bind(this)

    this.el.sceneEl.addEventListener('carouselchanged', this.handleCarouselChanged)
    this.el.sceneEl.addEventListener('cursorplaced', this.handleCursorPlaced)
  },
  update(oldData) {
    const { selected } = this.data

    if (oldData.selected !== selected) {
      this.el.sceneEl.emit('recenter')
      this.cursor.setAttribute('tap-place-cursor', { active: true })

      this.camera.removeAttribute('raycaster')
      this.camera.removeAttribute('cursor')
      this.cursor.removeAttribute('video-controller')

      const thumbSrc = `#thumb-${selected}`
      this.cursor.setAttribute('ghost-model', { thumbSrc })
    }
  },
  remove() {
    if (this.videoEl && this.videoEl.parentElement) {
      this.videoEl.parentElement.removeChild(this.videoEl)
    }

    this.el.sceneEl.removeEventListener('carouselchanged', this.handleCarouselChanged)
  },
  /**
   * When the carousel is changed, update the selection manager's internal
   * state.
   * 
   * @param {object} eventDetail The event detail.
   */
  handleCarouselChanged({ detail }) {
    const { newIndex } = detail

    this.el.setAttribute('selection-manager', { selected: newIndex })
  },
  /**
   * When the cursor receives a placement, remove the attached ghost model and
   * attach a video entity that corresponds to the current selection.
   */
  handleCursorPlaced() {
    const { selected } = this.data
    
    const videoSrc = `#video-${selected}`

    this.cursor.removeAttribute('ghost-model')
    this.cursor.setAttribute('video-controller', { videoSrc })
  },
}

export default selectionManagerComponent
