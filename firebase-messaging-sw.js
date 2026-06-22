// Import the Firebase scripts inside the worker context
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize Firebase inside the worker using your project details
firebase.initializeApp({
  apiKey: "AIzaSyAsX-ExampleKey-12345",
  authDomain: "lost-and-found-app-9d5d4.firebaseapp.com",
  projectId: "lost-and-found-app-9d5d4",
  storageBucket: "lost-and-found-app-9d5d4.appspot.com",
  messagingSenderId: "543210987654",
  appId: "1:543210987654:web:abcd1234efgh5678"
});

const messaging = firebase.messaging();

// Handle background notifications cleanly
messaging.onBackgroundMessage((payload) => {
  console.log('Background message received: ', payload);

  const notificationTitle = payload.notification.title || 'VU Find Update';
  const notificationOptions = {
    body: payload.notification.body || 'There is an update regarding a campus item.',
    icon: '/favicon.ico' // Update this path to your app icon if you have one
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});