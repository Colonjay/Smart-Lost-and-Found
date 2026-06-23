importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB_hIRIfUfI0uivKKkRk8xno9TQwt0T4jM",
  authDomain: "lost-and-found-app-9d5d4.firebaseapp.com",
  projectId: "lost-and-found-app-9d5d4",
  storageBucket: "lost-and-found-app-9d5d4.firebasestorage.app",
  messagingSenderId: "334727118690",
  appId: "1:334727118690:web:6430baaf5ac60522cfb63b"
});

const messaging = firebase.messaging();

const VU_ICON = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><rect width='192' height='192' rx='36' fill='%231a3580'/><rect x='20' y='20' width='152' height='152' rx='24' fill='%23cc1414'/><text x='96' y='130' font-family='Arial' font-weight='900' font-size='90' fill='white' text-anchor='middle'>VU</text></svg>";

// Handle background messages (app is closed or in background)
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Background message received:', payload);

  const notificationTitle = payload.notification?.title || payload.data?.title || '🔔 VU Find';
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body || 'You have a new notification',
    icon: VU_ICON,
    badge: VU_ICON,
    tag: payload.data?.tag || 'vufind-fcm',
    renotify: true,
    data: payload.data || {}
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click — open/focus the app
self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      for (const client of list) {
        if (client.url && client.focus) return client.focus();
      }
      return clients.openWindow('/Smart-Lost-and-Found/');
    })
  );
});
