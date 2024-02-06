document.addEventListener("DOMContentLoaded", async function () {
   
    // setup the map
    const map = L.map("singaporeMap");
    map.setView([1.3521, 103.8198], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);


    // a 'layer' is anything that is drawn on the map
    // a marker is a layer, a circle is a layer etc.
    // a layer group is also a layer, but its purpose to other layers
    const markerGroup = L.layerGroup(); 
    markerGroup.addTo(map);
    for (let i = 0; i < 10; i++) {
        const marker = L.marker(getRandomLatLng(map));
        marker.addTo(markerGroup)
    }

    // create a layer of random circles
    const circleLayer = L.layerGroup();
    circleLayer.addTo(map);
    for (let i = 0; i < 10; i++) {
        const circle = L.circle(getRandomLatLng(map), {
            color: 'red',
            fillColor: 'green',
            fillOpacity:0.5,
            radius: Math.floor(Math.random() * 100 + 100)
        });
        circle.addTo(circleLayer)
    }

    const blueCircleLayer = L.layerGroup();
    blueCircleLayer.addTo(map);
    for (let i = 0; i < 10; i++) {
        const circle = L.circle(getRandomLatLng(map), {
            color: 'blue',
            fillColor: 'blue',
            fillOpacity:0.5,
            radius: Math.floor(Math.random() * 100 + 100)
        });
        circle.addTo(blueCircleLayer)
    }


    // create a layer of random rectangles
    const rectangleLayer = L.layerGroup();
    rectangleLayer.addTo(map);
    for (let i = 0; i < 10; i++) {
        const randomLatLng = getRandomLatLng(map);
        const bounds = [ randomLatLng, [randomLatLng[0]+0.05, randomLatLng[1]+0.05]];
        const rectangle = L.rectangle(bounds, {color: "#ff7800", weight: 1});
        rectangle.addTo(rectangleLayer);
    }

    // Layer control
    // allows the user to choose which layers are visible

    const baseLayers = {
        'Markers': markerGroup,
        'Circles': circleLayer
    }

    const overlayLayers = {
        'Rectangles': rectangleLayer,
        'Blue Circles': blueCircleLayer
    }

    // create a layer selecton widget on the map
    // first parameter: base layer
    // second parameter: overlay layers
    L.control.layers(baseLayers, overlayLayers).addTo(map);

    document.querySelector("#showBlueCircles").addEventListener("click", function(){
        map.addLayer(blueCircleLayer);
    })

    document.querySelector("#hideBlueCircles").addEventListener("click", function(){
        map.removeLayer(blueCircleLayer);
    })

    document.querySelector("#toggleBlueCircles").addEventListener("click", function(){
        // we can check if a layer is in a map but using the hasLayer function
        if (map.hasLayer(blueCircleLayer)) {
            map.removeLayer(blueCircleLayer)
        } else {
            map.addLayer(blueCircleLayer)
        }
    })

});

function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [ randomLat, randomLng,];
}
