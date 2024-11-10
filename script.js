import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { requestNotificationPermission } from "./FCM.js";

// Initialize map and set view to a default location (centered on the world)
const map = L.map('map').setView([20, 0], 2); // World view to start

// Add satellite map layer from Mapbox (replace 'your_access_token' with a valid token)
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGV2ZHV0dDAzIiwiYSI6ImNtM2JjYjUyYzBobngyanF5bWkxY2ZudnYifQ.U6ilje5l_flvteEQ5Kt_AA', {
    attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

let userMarker, driverMarker;

// Function to find and display user's location
function findUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // Remove old user marker if it exists
            if (userMarker) map.removeLayer(userMarker);

            // Add user marker
            userMarker = L.marker([userLat, userLng]).addTo(map)
                .bindPopup("You are here").openPopup();
            
            // Center map to user's location
            map.setView([userLat, userLng], 14);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to simulate driver location near the user
function simulateDriverLocation() {
    if (!userMarker) {
        alert("Find your location first!");
        return;
    }

    // Get user's current location from the map
    const userLocation = userMarker.getLatLng();
    const driverLat = userLocation.lat + (Math.random() * 0.02 - 0.01);
    const driverLng = userLocation.lng + (Math.random() * 0.02 - 0.01);

    // Remove old driver marker if it exists
    if (driverMarker) map.removeLayer(driverMarker);

    // Add driver marker
    driverMarker = L.marker([driverLat, driverLng], { color: 'blue' }).addTo(map)
        .bindPopup("Driver is nearby").openPopup();
}

// Firebase Database reference
const db = getDatabase();
const alcoholLevelRef = ref(db, "sensor/alcoholLevel");

// Function to update alcohol level display and trigger notification if level is high
onValue(alcoholLevelRef, (snapshot) => {
    const alcoholLevel = snapshot.val();
    document.getElementById("alcoholLevelDisplay").innerText = `Alcohol Level: ${alcoholLevel}`;

    // Define a threshold level for triggering a notification
    const THRESHOLD_LEVEL = 50; // Adjust this as needed

    if (alcoholLevel > THRESHOLD_LEVEL) {
        alert("Warning: High alcohol level detected!");
        // Trigger additional notification logic if needed
    }
});

// Request permission for push notifications
window.onload = () => {
    requestNotificationPermission();
};
