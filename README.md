# openlayers-side-by-side

A Openlayers control to add a split screen to compare two map overlays.

![screencast example](screen.gif)

Creates a new Openlayers Control for comparing two layers or collections of layers.

### Methods

| Method           | Returns        | Description   |
| ----------       | -------------- | ------------- |
| `addLeftLayer`   | `this`         | Add the layer for the left side  |
| `addRightLayers` | `this`         | Add the layer for the right side |
| `remove`         | `void`         | Close split screen |
| `open`           | `void`         | Oepn(Reopen) split screen |
### Usage

Add the script to the top of your page (css is included in the javascript):

```html
<script src="ol-side-by-side.min.js"></script>
```

Or if you are using browserify:

```js
import SDSControl from '../src/index.js';
```
Then create a map, add two layers to it, and create the SideBySide control and add it to the map:

```js
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ'
import View from 'ol/View';

import 'ol/src/ol.css';

let layer1 = new TileLayer({
    source: new OSM()
});
let key = 'your key from https://www.maptiler.com';
var attributions = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

let layer2 = new TileLayer({
    source: new XYZ({
      attributions: attributions,
      url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + key,
      maxZoom: 20
    })
});
let sds = new SDSControl();

let map = new Map({
    layers: [layer1, layer2],
    target: 'map',
    view: new View({
        center: [0, 0],
        zoom: 0,
    }),
    controls:[
        sds,
    ]
});

sds.addLeftLayer(layer2);
sds.addRightLayer(layer1);
```

### Limitations

- The divider is not movable with IE.
- Probably won't work in IE8, but what does?

### License

Apache2
