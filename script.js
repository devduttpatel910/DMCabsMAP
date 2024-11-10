import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { requestNotificationPermission } from "./FCM.js";

// Find User Location on Map
function findUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLatLng = [position.coords.latitude, position.coords.longitude];
            // Update map with user location
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Simulate Driver Location for testing
function simulateDriverLocation() {
    const driverLatLng = [YOUR_DRIVER_LATITUDE, YOUR_DRIVER_LONGITUDE];
    // Update map with driver location
}

// Initialize Firebase Database
const db = getDatabase();
const alcoholLevelRef = ref(db, "sensor/alcoholLevel"); // Adjust path as needed

// Update the displayed alcohol level and trigger notifications if needed
onValue(alcoholLevelRef, (snapshot) => {
    const alcoholLevel = snapshot.val();
    document.getElementById("alcoholLevelDisplay").innerText = `Alcohol Level: ${alcoholLevel}`;

    if (alcoholLevel > THRESHOLD_LEVEL) { // Define your threshold
        alert("Warning: High alcohol level detected!");
    }
});

// Call notification permission on page load
window.onload = () => {
    requestNotificationPermission();
};
