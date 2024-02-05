

document.addEventListener("DOMContentLoaded", async function () {
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

    // load in all the available taxi using the Taxi Availablity API
    const response = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");

    const taxiCluster = L.markerClusterGroup();
    taxiCluster.addTo(map);
    
    // create one marker for each pair of coordinate
    for (let taxi of response.data.features[0].geometry.coordinates) {
       
        // 1. create a marker for the taxi 
        const coordinate = [taxi[1], taxi[0]]; // rearrange so that the coordinate is lat,lng instead of lng,lat
        const marker = L.marker(coordinate);

        // 2. add the taxi marker to the map
        marker.addTo(taxiCluster);
    }
})