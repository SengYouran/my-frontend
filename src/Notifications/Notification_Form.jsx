import React, { useState, useRef, useEffect } from "react";
import { useDataContext } from "../Context";

function Notification_Form() {
  const {
    sendNotification,
    handleChangeNotification,
    formNotification,
    storeReceiver,
    searchReceiver,
    setSearchReceiver,
    loadingNotification,
  } = useDataContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const refReceiver = useRef(null);

  // close dropdown when click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (refReceiver.current && !refReceiver.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // filter receiver
  const filteredReceiver = storeReceiver?.filter((item) =>
    `${item.first_name} ${item.last_name}`
      .toLowerCase()
      .includes(searchReceiver.toLowerCase()),
  );

  function handleSelectReceiver(item) {
    handleChangeNotification({
      target: {
        name: "receiver_id",
        value: item.id,
      },
    });

    setSearchReceiver(`${item.first_name} ${item.last_name}`);
    setShowDropdown(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendNotification();
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Notification</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
      >
        {/* sender_id */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Sender ID</label>
          <input
            type="number"
            name="sender_id"
            value={formNotification?.sender_id ?? ""}
            onChange={handleChangeNotification}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* receiver dropdown */}
        <div className="flex flex-col relative" ref={refReceiver}>
          <label className="mb-1 font-medium">Receiver</label>

          <input
            type="text"
            placeholder="Search receiver..."
            value={searchReceiver}
            onFocus={() => setShowDropdown(true)}
            onChange={(e) => {
              setSearchReceiver(e.target.value);
              setShowDropdown(true);
            }}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {showDropdown && (
            <div className="absolute top-full left-0 w-full bg-white border rounded-md shadow-md max-h-48 overflow-y-auto z-10">
              {filteredReceiver?.length > 0 ? (
                filteredReceiver.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectReceiver(item)}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {item.id} - {item.first_name} {item.last_name}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No receiver found</div>
              )}
            </div>
          )}
        </div>

        {/* title */}
        <div className="md:col-span-2 flex flex-col">
          <label className="mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formNotification?.title ?? ""}
            onChange={handleChangeNotification}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* description */}
        <div className="md:col-span-2 flex flex-col">
          <label className="mb-1 font-medium">Descriptions</label>
          <textarea
            rows="3"
            name="descriptions"
            value={formNotification?.descriptions ?? ""}
            onChange={handleChangeNotification}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* button */}
        <div className="md:col-span-2">
          {loadingNotification ? (
            <div className="flex justify-center items-center gap-2 py-4 bg-gray-50">
              <div className="w-2 h-3 bg-blue-500 rounded-full loader"></div>
              <div className="w-2 h-3 bg-purple-500 rounded-full loader"></div>
              <div className="w-2 h-3 bg-pink-500 rounded-full loader"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Send Notification
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Notification_Form;
