import './index.scss'

/**
 * A valid CSS color.
 * 
 * @typedef {string} Color
 */

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
 * Component that skins the loading screen.
 * 
 * @property {Color} primaryColor The primary color. Used for the top box on the loading screen.
 * @property {Color} secondaryColor The secondary color. Used for the prompt box.
 * @property {Color} backgroundColor The background color. Used for the loading screen and the prompt screen.
 * @property {Color} primaryButtonColor The primary button color. Used for the right button in the prompt box.
 * @property {Color} secondaryButtonColor The secondary button color. Used for the left button in the prompt box.
 * @property {Color} textColor The text color. Affects all text.
 * @property {string} fontFamily The typeface to use. Affects all text.
 * @property {string} promptText The text to include in the device motion sensors permissions prompt.
 * @property {string} primaryButtonText The text to include for the right button in the prompt box.
 * @property {string} secondaryButtonText  The text to include for the left button in the prompt box.
 */

 const loadingSkinnerComponent = {
  schema: {
    primaryColor: { default: '' },
    secondaryColor: { default: '' },
    backgroundColor: { default: '' },
    primaryButtonColor: { default: '' },
    secondaryButtonColor: { default: '' },
    textColor: { default: '' },
    fontFamily: { default: '' },
    promptText: { default: '' },
    primaryButtonText: { default: '' },
    secondaryButtonText: { default: '' },
  },
  init() {
    const {
      primaryColor,
      secondaryColor,
      backgroundColor,
      primaryButtonColor,
      secondaryButtonColor,
      textColor,
      fontFamily,
      promptText,
      primaryButtonText,
      secondaryButtonText,
    } = this.data

    if (primaryColor) {
      document.documentElement.style.setProperty('--primarycolor', primaryColor)
    }

    if (secondaryColor) {
      document.documentElement.style.setProperty('--secondarycolor', secondaryColor)
    }

    if (backgroundColor) {
      document.documentElement.style.setProperty('--backgroundcolor', backgroundColor)
    }

    if (primaryButtonColor) {
      document.documentElement.style.setProperty('--primarybuttoncolor', primaryButtonColor)
    }

    if (secondaryButtonColor) {
      document.documentElement.style.setProperty('--secondarybuttoncolor', secondaryButtonColor)
    }

    if (textColor) {
      document.documentElement.style.setProperty('--textcolor', textColor)
    }

    if (fontFamily) {
      document.documentElement.style.setProperty('--fontfamily', fontFamily)
    }

    if (promptText || primaryButtonText || secondaryButtonText) {
      let inDom = false

      const observer = new MutationObserver(() => {
        if (document.querySelector('.prompt-box-8w')) {
          if (!inDom) {
            if (promptText) {
              document.querySelector('.prompt-box-8w p').innerHTML = promptText
            }

            if (primaryButtonText) {
              document.querySelector('.button-primary-8w').innerHTML = primaryButtonText
            }

            if (secondaryButtonText) {
              document.querySelector('.prompt-button-8w').innerHTML = secondaryButtonText
            }
          }

          inDom = true
        } else if (inDom) {
          inDom = false
          observer.disconnect()
        }
      })

      observer.observe(document.body, { childList: true })
    }
  },
}

export default loadingSkinnerComponent
