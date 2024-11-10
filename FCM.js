// FCM.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getMessaging, onMessage, getToken } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCczgX-9HVUOLqGOxfvprWUTFV87OBvWU0",
  authDomain: "dmcabs-9fda9.firebaseapp.com",
  projectId: "dmcabs-9fda9",
  storageBucket: "dmcabs-9fda9.firebasestorage.app",
  messagingSenderId: "107622849781",
  appId: "1:107622849781:web:c70cb7807555934202f9bc",
  measurementId: "G-K4T1YC60EP"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission and get token for push notifications
export function requestNotificationPermission() {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            getToken(messaging, { vapidKey: "YOUR_PUBLIC_VAPID_KEY" }).then(currentToken => {
                if (currentToken) {
                    console.log("Notification Token:", currentToken);
                    // Save or send token to your server here
                } else {
                    console.log("No registration token available.");
                }
            }).catch(error => {
                console.error("An error occurred while retrieving token.", error);
            });
        }
    });
}
