import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ'
import View from 'ol/View';
import SDSControl from '../src/index.js';

import 'ol/src/ol.css';

let layer1 = new TileLayer({
    source: new OSM()
});
var key = 'd9Ss9BcdPP3i5Yj36mEh';
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
sds.remove();
sds.open();