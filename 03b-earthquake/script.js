

document.addEventListener("DOMContentLoaded", async function () {
    // we need to create a map object and set its center and zoom level
    const map = L.map('map');
    map.setView([1.3526, 103.8352], 13);

    // create a tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);

    // load in all the available taxi using the Taxi Availablity API
    const response = await axios.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson");

    const cluster = L.markerClusterGroup();
    cluster.addTo(map);
    
    // create one marker for each pair of coordinate
    for (let eachEarthquake of response.data.features) {
        let coordinate = eachEarthquake.geometry.coordinates;
        console.log(coordinate);
        L.marker([coordinate[1], coordinate[0]]).addTo(cluster);
    }
    
})