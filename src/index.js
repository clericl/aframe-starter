import cameraTrackerComponent from './components/cameraTracker'
import ghostModelComponent from './components/ghostModel'
import landingPageComponent from './components/landingPage'
import loadingSkinnerComponent from './components/loadingSkinner'
import proximityTriggerComponent from './components/proximityTrigger'
import selectionManagerComponent from './components/selectionManager'
import staticCubemapComponent from './components/staticCubemap'
import tapPlaceCursorComponent from './components/tapPlaceCursor'
import uiCarouselComponent from './components/uiCarousel'
import {
  videoControllerComponent,
  videoControllerSystem,
} from './components/videoController'

import './styles/index.scss'

AFRAME.registerComponent('camera-tracker', cameraTrackerComponent)
AFRAME.registerComponent('ghost-model', ghostModelComponent)
AFRAME.registerComponent('landing-page', landingPageComponent)
AFRAME.registerComponent('loading-skinner', loadingSkinnerComponent)
AFRAME.registerComponent('proximity-trigger', proximityTriggerComponent)
AFRAME.registerComponent('selection-manager', selectionManagerComponent)
AFRAME.registerComponent('static-cubemap', staticCubemapComponent)
AFRAME.registerComponent('tap-place-cursor', tapPlaceCursorComponent)
AFRAME.registerComponent('ui-carousel', uiCarouselComponent)
AFRAME.registerComponent('video-controller', videoControllerComponent)

AFRAME.registerSystem('video-controller', videoControllerSystem)
