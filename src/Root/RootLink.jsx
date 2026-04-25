import React from "react";
import { Outlet } from "react-router-dom";
import Large from "../Header/Large_Notification";
import Header_Link_Navbar from "../Header/Header_Link_Navbar";
import Small_Profile from "../Header/Small_Profile";
import Small_Link from "../Header/Small_Link";
import Notification from "../Notifications/Notification";
function RootLink() {
  return (
    <React.Fragment>
      <Header_Link_Navbar />
      <Small_Link />
      <Small_Profile />
      <Notification />
      <div className="ms:p-0 md:ml-[21%] md:mt-2">
        <Large />
        <div className="mt-20 md:mt-4">
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}

export default RootLink;
