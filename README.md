# 🚀 This is an A-Frame/8th Wall project starter!

## Table of contents
1. [Getting started](#getting-started)
2. [Preregistered components](#preregistered-components)
## Getting started

First, make sure that you've created a corresponding project in 8th Wall. Grab the App Key provided under the Settings page for that project and replace the `XXXXX` in line 16 of `index.html` with your App Key.

Next, install packages.
```
npm install
```

Run the development server.
```
npm start
```

You're ready to rumble!

## Preregistered Components  
### `landingPage`  
Style the landing page.

| Attribute | Type | Default | Description |
| ----- | ----- | ----- | ----- |
| `backgroundImage` | selector | `null` | The src for the `<img>` element to use as the landing page background.
| `title` | string | `''` | The title text for the landing page. |
| `body` | string | `''` | The body text for the landing page. |
| `cta` | string | `''` | The button text for the landing page. |
### `loadingSkinner`
Style the loading page.

| Attribute | Type | Default | Description |
| ----- | ----- | ----- | ----- |
| `primaryColor` | color | `#4b4768` | The background color of the top box on the loading screen. |
| `secondaryColor` | color | `#3a3c55` | The background color of the prompt box. |
| `backgroundColor` | color | `#12101b` | The background color of the loading screen and the prompt screen. |
| `primaryButtonColor` | color | `#ac4fff` | The background color of the right-side button of the device motion sensor prompt box. |
| `secondaryButtonColor` | color | `#8083a2` | The background color of the left-side button of the device motion sensor prompt box. |
| `textColor` | color | `#fcfeff` | The text color for all elements in the loading screen. |
| `fontFamily` | string | `Nunito-SemiBold, sans-serif` | The typeface for all elements in the loading screen. |
| `promptText` | string | AR requires access to device motion sensors | The text to be displayed in the device motion sensor prompt box. |
| `primaryButtonText` | string | Continue | The text to be displayed in the right-side button of the device motion sensor prompt box. |
| `secondaryButtonText` | string | Cancel | The text to be displayed in the left-side button of the device motion sensor prompt box. |

### `proximityTrigger`
Track if the camera is within a certain distance of an entity.

| Attribute | Type | Default | Description |
| ----- | ----- | ----- | ----- |
| `threshold` | number | 13 | Threshold in AR units ("meters") within which the entity will be considered in proximity to the camera. |

| Event | Detail | Description |
| ----- | ----- | ----- |
| `enteredproximity` | `{ el: HTMLElement }` | Emitted when the camera moves into proximity of the entity from outside of proximity. |
| `exitedproximity` |  `{ el: HTMLElement }` | Emitted when the camera moves out of proximity of the entity from within proximity. |

### `staticCubemap`
Add a static preset environment cubemap to a model.

### `uiCarousel`
Add a swipeable carousel to the bottom of the screen. You may use multiple `uiCarousel` components on a single entity, differentiated with the `___foo` suffix where `foo` is a unique identifier string.

| Attribute | Type | Default | Description |
| ----- | ----- | ----- | ----- |
| `container` | selector | `null` | CSS selector string to identify the container element upon which to install the carousel. The child elements of the container elements will become the carousel items. |
| `selected` | number | 0 | Single source of truth for the currently selected carousel item. Automatically updates when an item is selected via the UI. Can be force set by updating this attribute value. |

| Event | Detail | Description |
| ----- | ----- | ----- |
| `carouselchanged` | `{ newIndex: number }` | Emitted when the carousel updates the currently selected index. |
