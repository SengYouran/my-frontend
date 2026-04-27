import React, { useEffect, useState } from "react";
import { useDataContext } from "../Context";
import { useNavigate } from "react-router-dom";
import AlertNotification from "../Notifications/AlertNotification";

function Large() {
  const { logout, loading, auth, readNotification, setAlertNotification } =
    useDataContext();
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const formatted = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
  function goDashboard() {
    navigate("/dashboard");
  }
  return (
    <div className="hidden md:block">
      {loading ? (
        <div className="bg-white p-4 shadow flex justify-between">
          <div className="h-5 w-40 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
      ) : (
        <div className="flex justify-between items-center rounded-md mr-4 bg-white shadow-[0_4px_10px_rgba(75,85,99,0.1)] px-3 py-4">
          {/* Left */}
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => goDashboard()}
            >
              <i className="fa-solid fa-house-chimney-crack text-gray-700"></i>
              <h2 className="text-[16px] bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                Home
              </h2>
            </div>
            <i className="fa-solid fa-angle-right text-[14px] text-gray-700 mt-1"></i>
            <h2 className="text-[15px] text-gray-700 font-medium">
              {auth?.role}
            </h2>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 relative">
            <div className="relative">
              <i
                className="fa-regular fa-bell text-xl cursor-pointer"
                onClick={() => setAlertNotification(true)}
              ></i>
              <p
                onClick={() => setAlertNotification(true)}
                className="bg-red-500 text-[10px] font-bold text-white px-1 rounded-full absolute -right-1 bottom-4"
              >
                {readNotification?.total || 0}
              </p>
              <AlertNotification />
            </div>

            <h2 className="text-[14px] font-medium text-gray-700">
              {formatted}
            </h2>

            {/* ✅ Logout fixed */}
            <h2
              className="text-[14px] font-medium text-gray-700 cursor-pointer border-l-2 pl-2 hover:text-red-500"
              onClick={() => {
                logout();
                navigate("/", { replace: true });
              }}
            >
              Log out
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Large;
