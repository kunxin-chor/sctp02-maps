const EARTHQUAKE_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

document.addEventListener("DOMContentLoaded", async function () {

    const map = L.map('map');  // first parameter: the id of where the map should be displayed.
    map.setView([36.2048, 138.252], 6);

    // set the tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // have a function to load the earthquake data via axios
    // and return the array of coordinates
    const earthquakeCoordinates = await loadEarthquakeData();

    // create the marker cluster layer
    const markerCluster = L.markerClusterGroup();
    markerCluster.addTo(map);

    drawEarthquakeMarkers(markerCluster, earthquakeCoordinates);

})

function drawEarthquakeMarkers(layer, coordinates) {
    console.log(coordinates);
    for (let c of coordinates) {
        // create a marker
        const marker = L.marker(c.coordinates);
        marker.bindPopup(`<h1>${c.title}</h1>`);
        marker.addTo(layer);

    }
}

async function loadEarthquakeData() {
    const response = await axios.get(EARTHQUAKE_URL);
    
    // extract all the earthquake coordinates
    // reminder: to extract the first earthquake coordinate, use
    // response.data.features[0].geometry.coordinates
    // (using the mapping technique)
    let earthquakeCoordinates = [];  // accumulator

    for (let earthquake of response.data.features) {
        const lat = earthquake.geometry.coordinates[1];
        const lng = earthquake.geometry.coordinates[0];
        const title = earthquake.properties.title;
        earthquakeCoordinates.push({
            "title": title,
            "coordinates":[lat,lng]
        });
    }
    return earthquakeCoordinates;
}

