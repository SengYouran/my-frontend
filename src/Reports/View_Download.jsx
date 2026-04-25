import React, { useRef, useEffect } from "react";
import { useDataContext } from "../Context";

const viewLimit = [10, 20, 30, 40, 50, 60, 70, 90, 100, "All"];

function View_Download({ show, setShow }) {
  const { downloadExcel, downloadPDF, setPages, pages } = useDataContext();
  const { limit } = pages.reporting;
  const dropdownRef = useRef(null);

  // Close dropdown when click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShow]);

  const handleSelect = (value) => {
    const newLimit = value === "All" ? 0 : Number(value); // 0 = fetch all
    setPages((prev) => ({
      ...prev,
      reporting: {
        ...prev.reporting,
        limit: newLimit,
      },
    }));
    setShow(false);
  };

  return (
    <div className="flex gap-3 items-center">
      {/* Limit Dropdown */}
      <div className="relative w-44" ref={dropdownRef}>
        <div className="flex border border-yellow-500 rounded-lg overflow-hidden shadow-sm bg-white">
          <input
            type="text"
            value={limit === 0 ? "All" : limit}
            readOnly
            className="w-2/3 px-2 py-2 text-center focus:outline-none cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          />
          <button
            onClick={() => setShow((prev) => !prev)}
            className="w-1/3 bg-yellow-500 flex justify-center items-center text-white hover:bg-yellow-600 transition"
          >
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        </div>

        {/* Dropdown List */}
        {show && (
          <div className="absolute left-0 mt-2 w-full bg-white border rounded-lg shadow-lg z-20 overflow-hidden">
            {viewLimit.map((item) => (
              <div
                key={item}
                onClick={() => handleSelect(item)}
                className={`px-3 py-2 text-center cursor-pointer hover:bg-yellow-100 ${
                  (item === "All" && limit === 0) || item === limit
                    ? "bg-yellow-200 font-semibold"
                    : ""
                }`}
              >
                {item === "All" ? "Show All" : `${item} / page`}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PDF Export */}
      <button
        onClick={downloadPDF}
        className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded flex items-center gap-2 transition cursor-pointer"
      >
        <i className="fa-solid fa-file-pdf"></i>
        Export PDF
      </button>

      {/* Excel Export */}
      <button
        onClick={downloadExcel}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 transition cursor-pointer"
      >
        <i className="fa-solid fa-file-excel"></i>
        Export Excel
      </button>
    </div>
  );
}

export default View_Download;
