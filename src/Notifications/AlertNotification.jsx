import React, { useState } from "react";
import { useDataContext } from "../Context";

function AlertNotification() {
  const {
    readNotification,
    setNotification,
    markReadMessage,
    alertNotification,
    setAlertNotification,
  } = useDataContext();
  const [selected, setSelected] = useState(null); //
  return (
    <div
      className={`bg-white p-4 rounded absolute top-10 z-70 -left-30 w-[18rem] shadow-lg
    ${alertNotification ? "flex flex-col gap-2" : "hidden"}
    `}
      onMouseLeave={() => setAlertNotification(false)}
    >
      <h2 className="text-xl font-medium mb-2">Notifications</h2>

      {/* LIST */}
      {!selected && (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {readNotification?.notifications?.length === 0 ? (
            <p className="text-gray-400 text-sm font-medium text-center">No notifications</p>
          ) : (
            readNotification?.notifications?.map((item, index) => (
              <div
                key={index}
                className="p-2 rounded-lg bg-gray-50 hover:bg-gray-50 transition flex justify-between items-center"
              >
                <h3 className="text-xs font-medium">{item?.title}</h3>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setSelected(item);
                      markReadMessage(item?.notification_id);
                    }}
                    className="text-xs font-medium cursor-pointer text-blue-500 hover:underline"
                  >
                    Mark Read
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* DETAIL VIEW */}
      {selected && (
        <div className="space-y-2">
          <button
            onClick={() => setSelected(null)}
            className="text-xs text-white bg-blue-300 p-1 rounded cursor-pointer hover:bg-blue-500"
          >
            ← Back
          </button>

          <h3 className="text-sm font-medium">{selected.title}</h3>

          <p className="text-xs font-medium text-gray-900">
            {selected.descriptions}
          </p>

          <div className="mt-2 text-right">
            <button
              onClick={() => setSelected(null)}
              className="bg-blue-500 text-white cursor-pointer text-xs px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div
        onClick={() => setNotification(true)}
        className="text-white flex justify-center mt-4 w-1/2 items-center gap-1 hover:opacity-80 bg-blue-500 p-2 rounded cursor-pointer"
      >
        <i className="fa-solid fa-pen"></i>
        <h2>Compose</h2>
      </div>
    </div>
  );
}

export default AlertNotification;
