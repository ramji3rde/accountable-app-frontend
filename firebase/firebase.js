import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { reactLocalStorage } from "reactjs-localstorage";

const firebaseConfig = {
  apiKey: "AIzaSyBWalqjIqkBPRXYqV8ZwJ_OxXY4WUm7xD8",
  authDomain: "property-management-app-631ba.firebaseapp.com",
  projectId: "property-management-app-631ba",
  storageBucket: "property-management-app-631ba.appspot.com",
  messagingSenderId: "227500865964",
  appId: "1:227500865964:web:ce4e888caba0ff177f2209",
  measurementId: "G-K5YQYJD97R",
};

export const app = initializeApp(firebaseConfig);

export const requestPermission = () => {
  if (typeof window !== "undefined") {
    if ("Notification" in window) {
      const messaging = getMessaging(app);

      // console.log("Requesting User Permission......");
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // console.log("Notification User Permission Granted.");
          return getToken(messaging, {
            vapidKey: `BBhKtQ7UrG1_yXnUwVyKuOCVwbN0qStCPnHzhJMlTLtyqSDoCsYx8F5BxXEkMNokLzPd2n6ugvtOE21zjVF6HI0`,
          })
            .then((currentToken) => {
              if (currentToken) {
                reactLocalStorage.set("fcm_token", currentToken);
              } else {
                console.log("Failed to generate the app registration token.");
              }
            })
            .catch((err) => {
              console.log(
                "An error occurred when requesting to receive the token.",
                err
              );
            });
        } else {
          // console.log("User Permission Denied.");
        }
      });
    }
  }
};
