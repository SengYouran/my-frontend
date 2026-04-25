import React from "react";
import Notification_Form from "./Notification_Form";
import { useDataContext } from "../Context";

function Notification() {
  const { notification, setNotification, } = useDataContext();
  return (
    <div>
      <div
        className={`absolute z-82 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white transform transition-all duration-500
       ${notification ? "scale-110" : "scale-0 -z-80 opacity-0"} `}
      >
        <Notification_Form />
      </div>
      <div
        onClick={() => setNotification(false)}
        className={`bg-black opacity-30 fixed inset-0 ${notification ? "block z-80" : "hidden -z-70"}`}
      ></div>
    </div>
  );
}

export default Notification;
