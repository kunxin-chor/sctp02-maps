
document.addEventListener("DOMContentLoaded", async function(){
    const map = L.map("singaporeMap");
    map.setView([1.3521, 103.8198], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
    
    const cyclingResponse = await axios.get('data/cycling.geojson');
    const cyclingLayer = L.geoJson(cyclingResponse.data, {
        // the onEachFeatue function is executed on each feature from the geoJson file
        // parameter 1: the feature object (from the geojson file)
        // parameter 2: the Leaflet visual representation (ie, a layer) of that feature
        onEachFeature:function(feature, layer) {
            // create a temporary <div> that will hold the content of the Description
            const tempElement = document.createElement('div');
            tempElement.innerHTML = feature.properties.Description;
            const tds = tempElement.querySelectorAll('td');
            const pathName = tds[0].innerHTML;
            const agency = tds[1].innerHTML;
            layer.bindPopup(`<h1>${pathName}</h1><h2>Maintained by: ${agency}`);
        }
    }).addTo(map);
    cyclingLayer.setStyle({
        color:'red'
    })

})

