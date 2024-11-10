import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";

// Firebase configuration
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
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

export function requestNotificationPermission() {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            getToken(messaging, { vapidKey: "your_vapid_key" }).then((currentToken) => {
                if (currentToken) {
                    console.log("Token received: ", currentToken);
                } else {
                    console.log("No registration token available.");
                }
            }).catch((err) => {
                console.log("An error occurred while retrieving token. ", err);
            });
        } else {
            console.log("Notification permission denied.");
        }
    });
}

// Handle incoming messages
onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // Customize notification handling here
});
