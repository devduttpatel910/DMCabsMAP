<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Map and Firebase Integration</title>
    <!-- Include Leaflet.js for the map -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    
    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js"></script>
</head>
<body>
    <div id="map" style="height: 600px;"></div>

    <script>
        // Firebase Configuration (Replace with your Firebase config)
        const firebaseConfig = {
            apiKey: "AIzaSyCczgX-9HVUOLqGOxfvprWUTFV87OBvWU0",
            authDomain: "dmcabs-9fda9.firebaseapp.com",
            projectId: "dmcabs-9fda9",
            storageBucket: "dmcabs-9fda9.firebasestorage.app",
            messagingSenderId: "107622849781",
            appId: "1:107622849781:web:c70cb7807555934202f9bc",
            measurementId: "G-K4T1YC60EP"
        };

        // Initialize Firebase
        const app = firebase.initializeApp(firebaseConfig);
        const messaging = firebase.messaging();

        // Request user permission for notifications
        messaging.requestPermission()
            .then(() => {
                console.log("Notification permission granted.");
                return messaging.getToken();  // Get the token to send push notifications
            })
            .then((token) => {
                console.log("FCM Token:", token);
                // You can store the token in your backend or Firebase Firestore
            })
            .catch((error) => {
                console.error("Permission denied", error);
            });

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

    </script>
</body>
</html>
