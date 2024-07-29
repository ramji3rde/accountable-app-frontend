// import firebase from "firebase/app";

// export const initializeFirebase = () => {
//   firebase.initializeApp({
//     apiKey: "AIzaSyCdHoq--Zb8QNwUEj5Uu5TzpqUA1LEcV1g",
//     authDomain: "pushnotification-f5971.firebaseapp.com",
//     projectId: "pushnotification-f5971",
//     storageBucket: "pushnotification-f5971.appspot.com",
//     messagingSenderId: "446995740398",
//     appId: "1:446995740398:web:32a29c901d9458ea1ae5ff",
//     measurementId: "G-TJTGK92MRF",
//   });
// };

// export const askForPermissionToReceiveNotifications = async () => {
//   try {
//     const messaging = firebase.messaging();
//     await messaging.requestPermission();
//     const token = await messaging.getToken();

//     return token;
//   } catch (error) {
//     console.error(error);
//   }
// };
