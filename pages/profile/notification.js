import { useState } from "react";
import SubHeader from "../../components/public-com/header";
import { reactLocalStorage } from "reactjs-localstorage";
import { useRouter } from "next/router";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { testPushNotificationAPI } from "../../redux/APIS/API";

function AppNotificationStatus() {
  const notification_status = reactLocalStorage.get(
    "fcm_send_notification_status"
  );
  const fcm_token = reactLocalStorage.get("fcm_token");

  const [toggle, setToggle] = useState(notification_status === "true");

  const router = useRouter();

  function ToggleFlagNotification() {
    if (toggle) {
      setToggle(false);
      reactLocalStorage.set("fcm_send_notification_status", "false");
    } else {
      setToggle(true);
      reactLocalStorage.set("fcm_send_notification_status", "true");
    }
  }

  useEffect(() => {
    // You can log the current 'toggle' value here.
  }, [toggle]);

  async function testPushNotification() {
    const query_data = `device_token=${fcm_token}&title=asdasd&body=asdasdas`;

    const testMsg = {
      token: fcm_token,
      title: "This notification",
      body: "This is test notification",
    };

    const res = await testPushNotificationAPI(testMsg);

    if (res?.data?.status) {
      toast.success("Test notification sent on your device");
    } else {
      toast.error("Something is wrong, please try again");
    }
  }

  return (
    <div className="App bg-[#f4f5f7] h-[100vh]">
      <SubHeader
        title={"Notifications"}
        className="text-[16px] text-normal font-sans"
        backUrl={"/profile/"}
      />

      <div className="grid w-full py-4 px-4 mb-[75px]">
        <div className="grid gap-4 mt-4 mb-10">
          <div className="pt-1 flex justify-between">
            <div className="w-[80%]">
              <h1 className="text-[16px] font-normal text-[#262626]">
                Flag Notification Reminders
              </h1>
              <p className="text-[12px] font-sans font-[400] text-[#595959]">
                Allow all notification reminders for flagged items
              </p>
            </div>
            <div className="pt-2 flex gap-[5px] justify-end w-[20%]">
              <span className="text-[12px] font-sans font-[400] text-[#000]">
                {toggle ? `On` : `Off`}
              </span>
              <button
                className={
                  toggle ? `toggleContainer isActive` : `toggleContainer`
                }
                onClick={() => ToggleFlagNotification()}
              >
                <span
                  className={toggle ? `toggleKnob isActive ` : `toggleKnob`}
                ></span>
              </button>
            </div>
          </div>

          <div className="pt-1 flex justify-between">
            <div className="w-[100%]" onClick={() => testPushNotification()}>
              <h1 className="text-[16px] font-normal text-[#262626]">
                Send Test Notification
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div
        className="bg-[#CCD9E6] h-[70px] w-[100%] text-center pt-4 rounded-[6px] fixed bottom-0"
        onClick={() => router.push("/profile")}
      >
        <span className="text-[22px] font-normal font-sans ">Cancel</span>
      </div>
    </div>
  );
}

export default AppNotificationStatus;
