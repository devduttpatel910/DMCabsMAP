// Initialize the map and set its view to a default location
const map = L.map('map').setView([20, 0], 2); // Starts at a world level view

// Add the satellite map layer from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Optional: Add a search function (Advanced)
// You can explore adding search functionality by using Leaflet's plugins, like Leaflet.Control.Geocoder
