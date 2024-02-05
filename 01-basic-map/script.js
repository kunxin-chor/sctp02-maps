// `L` is an object that represents leaflet
// L.map is a function that returns a new map object
// the first argument is the ID of the div or whatever that will display (i.e render) the map
const map = L.map("singaporeMap");

// set the center point of the map
// In leaflet, latlng are represented by an array
// - first index is lat
// - second index is lng
// Second argument is the zoom evel
map.setView([1.3521, 103.8198], 13);

// create the tile layer?
// layer = one image on the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);

// Add a marker
// L.marker creates a new marker
// first parameter: the lat, lng of the marker
let singaporeMarker = L.marker( [1.29, 103.85]);
singaporeMarker.addTo(map);

// .bindPopup will display a pop-up window when the marker is clicked
// It can be HTML
singaporeMarker.bindPopup(`<h1>Welcome to Singapore</h1>
    <img src="https://media.licdn.com/dms/image/C5112AQG5Twr9MX7a7w/article-cover_image-shrink_600_2000/0/1520217299579?e=2147483647&v=beta&t=CdOh1JffViBRAu_MmyF6SHTrvceJlarP4pPCsyzSYCY"/>
`);

let bukitTimahMarker = L.marker([1.3294, 103.8021]);;
bukitTimahMarker.addTo(map);

// if the parameter to bindPopup is a function,the function
// will be executed when the marker is clicked
bukitTimahMarker.bindPopup(function(){
    let paragraph = document.createElement('p');
    paragraph.innerHTML = "<p>Welcome to Singapore</p>";
    // any HTML element you return will be shown in the popup
    return paragraph;
})

// for other events beside 'click', we can use .addEventListener
let changiAirportMarker = L.marker([1.3545, 103.9886]);
changiAirportMarker.addTo(map);

changiAirportMarker.addEventListener("mouseover", function(){
    console.log("Mouse is now flying over Changi Airport");
})

let circle = L.circle([1.3448, 103.8224], {
    color: 'red',
    fillColor: 'orange',
    radius: 500,
    fillOpacity: 1
})
circle.addTo(map);