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
const database = firebase.database();
const messaging = firebase.messaging();

const alcoholLevelRef = database.ref('alcoholLevel');
alcoholLevelRef.on('value', (snapshot) => {
    const alcoholLevel = snapshot.val();
    document.getElementById('alcoholLevelDisplay').innerText = `Alcohol Level: ${alcoholLevel}`;
});
// Request permission for push notifications
messaging.requestPermission().then(() => {
    return messaging.getToken();
}).then((token) => {
    console.log('FCM Token:', token);
    // Send this token to your server to subscribe the user
}).catch((err) => {
    console.log('Error getting permission or token:', err);
});

// Handle incoming push notifications
messaging.onMessage((payload) => {
    console.log('Message received:', payload);
    // Display the notification in the web app or system tray
    alert(`Notification: ${payload.notification.body}`);
});
