import html from './index.html'

import './index.scss'

/**
 * A valid CSS selector.
 * 
 * @typedef {string} Selector
 */

/**
 * A valid image URL.
 * 
 * @typedef {string} ImageUrl
 */

/**
 * A valid img src.
 * 
 * @typedef {Selector|ImageUrl} ImageSrc
 */

/**
 * Component that adds a splash screen to the experience.
 * 
 * @property {ImageSrc} backgroundImage The src for the image to use as the splash screen background.
 * @property {string} title The title text.
 * @property {string} body The body text.
 * @property {string} cta The text for the call to action button.
 */
const landingPageComponent = {
  schema: {
    backgroundImage: { type: 'selector', default: null, },
    title: { default: '' },
    body: { default: '' },
    cta: { default: 'Enter AR' },
  },
  init() {
    const {
      backgroundImage,
      title,
      body,
      cta,
    } = this.data

    document.body.insertAdjacentHTML('beforeend', html)

    if (backgroundImage) {
      document.getElementById('landing-background').src = backgroundImage
    }

    if (title) {
      document.getElementById('landing-title').innerHTML = title
    }

    if (body) {
      document.getElementById('landing-body').innerHTML = body
    }

    if (cta) {
      document.getElementById('landing-cta').innerHTML = cta
    }

    this.el.sceneEl.addEventListener('realityready', () => {
      document.getElementById('landing-content').classList.add('fade-in')
      document.getElementById('landing-cta').addEventListener('click', () => {
        const landingPage = document.getElementById('landing')
        setTimeout(() => {
          landingPage.classList.add('fade-out')

          setTimeout(() => {
            landingPage.parentNode.removeChild(landingPage)
          }, 1500)
        }, 100)
      })
    })
  }
}

export default landingPageComponent
