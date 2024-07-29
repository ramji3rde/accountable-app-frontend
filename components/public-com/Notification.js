import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { requestPermission, onMessageListener } from "../../firebase/firebase";
import { getMessaging, onMessage } from "firebase/messaging";

function Notification() {
  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    requestPermission();
  }, []);
  return <div>{/* <Toaster /> */}</div>;
}
export default Notification;
