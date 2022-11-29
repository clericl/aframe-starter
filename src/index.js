import landingPageComponent from './components/landingPage'
import loadingSkinnerComponent from './components/loadingSkinner'
import proximityTriggerComponent from './components/proximityTrigger'
import staticCubemapComponent from './components/staticCubemap'
import uiCarouselComponent from './components/uiCarousel'

import './styles/index.scss'

AFRAME.registerComponent('landing-page', landingPageComponent)
AFRAME.registerComponent('loading-skinner', loadingSkinnerComponent)
AFRAME.registerComponent('proximity-trigger', proximityTriggerComponent)
AFRAME.registerComponent('static-cubemap', staticCubemapComponent)
AFRAME.registerComponent('ui-carousel', uiCarouselComponent)
