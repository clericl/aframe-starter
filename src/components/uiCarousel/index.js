import './index.scss'

/**
 * A component that installs a carousel-style option select interface.
 * Multiple carousel components may be controlled by the same a-entity, so
 * long as each component instance is assigned a unique suffix of __<ID>
 * (double underscore followed by an alphanumeric identifier). Each component
 * instance must be passed its own separate container element upon which to
 * mount the new carousel.
 * 
 * @property {element} container The container element the carousel should be mounted on. Should be in the body and outside the scene.
 * @property {number} selected The index of the currently selected option.
 * 
 * @fires carouselchanged
 */

const uiCarouselComponent = {
  multiple: true,
  schema: {
    container: { type: 'selector' },
    selected: { default: 0 },
  },
  init() {
    const { container } = this.data

    container.classList.add('carousel-container')

    this.carousel = document.createElement('div')
    this.carousel.setAttribute('id', 'carousel')

    Array.from(container.children).forEach((cell) => {
      cell.parentNode.removeChild(cell)
      this.carousel.appendChild(cell)
      cell.classList.add('carousel-cell')
    })

    container.appendChild(this.carousel)

    this.flickity = new Flickity(this.carousel, {
      cellAlign: 'left',
      contain: true,
      freeScroll: true,
      freeScrollFriction: 0.07,
      pageDots: false,
      prevNextButtons: false,
      on: {
        staticClick: (_, __, ___, cellIndex) => {
          this.el.setAttribute('ui-carousel', { selected: cellIndex })
        },
      }
    })
  },
  update(oldData) {
    const { carousel, el } = this
    const { selected } = this.data

    if (this.flickity && oldData.selected !== selected) {
      const allCells = carousel.querySelectorAll('.carousel-cell')
      if (typeof oldData.selected === 'number') {
        allCells[oldData.selected].classList.remove('carousel-selected')
      }

      if (typeof selected === 'number') {
        allCells[selected].classList.add('carousel-selected')
        el.sceneEl.emit('carouselchanged', { newIndex: selected })
      }
    }
  }
}

/**
 * New option selected. Does not fire if the active option is reselected.
 * 
 * @event carouselchanged
 * @type {object}
 * @property {number} newIndex The newly selected option.
 */

export default uiCarouselComponent
