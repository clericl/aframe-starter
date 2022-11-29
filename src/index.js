import landingPageComponent from './components/landingPage'
import loadingSkinnerComponent from './components/loadingSkinner'
import proximityTriggerComponent from './components/proximityTrigger'
import uiCarouselComponent from './components/uiCarousel'

import './styles/index.scss'

AFRAME.registerComponent('landing-page', landingPageComponent)
AFRAME.registerComponent('loading-skinner', loadingSkinnerComponent)
AFRAME.registerComponent('proximity-trigger', proximityTriggerComponent)
AFRAME.registerComponent('ui-carousel', uiCarouselComponent)
