// Import the Firebase scripts inside the worker context
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Configured Project Background Engine Setup
firebase.initializeApp({
  apiKey: "AIzaSyB_hIRIfUfI0uivKKkRk8xno9TQwt0T4jM",
  authDomain: "lost-and-found-app-9d5d4.firebaseapp.com",
  projectId: "lost-and-found-app-9d5d4",
  storageBucket: "lost-and-found-app-9d5d4.firebasestorage.app",
  messagingSenderId: "334727118690",
  appId: "1:334727118690:web:6430baaf5ac60522cfb63b",
  measurementId: "G-B26ZNCVY33"
});

const messaging = firebase.messaging();

// Handle background notifications cleanly
messaging.onBackgroundMessage((payload) => {
  console.log('Background message received: ', payload);

  const notificationTitle = payload.notification.title || 'VU Find Update';
  const notificationOptions = {
    body: payload.notification.body || 'There is an update regarding a campus item.',
    icon: '/favicon.ico'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
