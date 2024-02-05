// we need to create a map object and set its center and zoom level
const map = L.map('map');
map.setView([1.3526, 103.8352], 13);

// create a tile layer
const basemap = L.tileLayer('https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png', {
   detectRetina: true,
   maxZoom: 19,
   minZoom: 11,
   /** DO NOT REMOVE the OneMap attribution below **/
   attribution: '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
});
basemap.addTo(map);

// give a map object as parameter
// return a random lat, lng coordinate that
// is in the visible area of the map
function getRandomLatLng(map) {
        // get the boundaries of the map
        let bounds = map.getBounds(); // getBonuds() return the visible area of the map, which is rectangle
        // get the lat lng of the south west corner of the map
        let southWest = bounds.getSouthWest();
        // get the lat lng of the norht east corner of the map
        let northEast = bounds.getNorthEast();
        // lngSpan is the height of the visible area
        let lngSpan = northEast.lng - southWest.lng;
        // latSpna is the width of the visible area
        let latSpan = northEast.lat - southWest.lat;
    
        let randomLng = Math.random() * lngSpan + southWest.lng;
        let randomLat = Math.random() * latSpan + southWest.lat;
    
        return [ randomLat, randomLng,];
}

// Create a marker cluster layer
// A layer can sometimes contain other layers, depending on the type of layer
const markerClusterLayer = L.markerClusterGroup();

for (let i =0; i < 1000; i++) {
    const randomPosition = getRandomLatLng(map);
    L.marker(randomPosition).addTo(markerClusterLayer);
}

markerClusterLayer.addTo(map);