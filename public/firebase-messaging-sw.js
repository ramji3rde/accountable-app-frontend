importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");
// import { getMessaging, onBackgroundMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyBWalqjIqkBPRXYqV8ZwJ_OxXY4WUm7xD8",
    authDomain: "property-management-app-631ba.firebaseapp.com",
    projectId: "property-management-app-631ba",
    storageBucket: "property-management-app-631ba.appspot.com",
    messagingSenderId: "227500865964",
    appId: "1:227500865964:web:ce4e888caba0ff177f2209",
    measurementId: "G-K5YQYJD97R"
  };
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


// messaging.onBackgroundMessage(messaging, function (payload) {
//     console.log('Received background message ', payload);
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: "/logo.png"
//     };

//     return self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });

//firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: "/logo.png"
    };
    // const notificationOptions = {
    //     icon: "/logo.png"
    // };
    
    //console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Returning null or not returning anything will prevent the default notification
    // from being shown.
    return self.registration.showNotification(notificationTitle, notificationOptions);
   });

// messaging.onBackgroundMessage(function(payload) {
//     console.log('Received background message ', payload);
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: "/logo.png"
//     };

//     // return self.registration.showNotification(notificationTitle,
//     //     notificationOptions);
// });

// Listen for messages from Firebase Cloud Messaging





<<<<<<< HEAD
=======
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});
>>>>>>> c6bae88d9f7812fc8ff8f98e1efc5f0d4388c306
