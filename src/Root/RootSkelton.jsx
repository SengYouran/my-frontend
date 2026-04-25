import React from "react";

function RootSkelton() {
  return (
    <React.Fragment>
      <div className="flex justify-center items-center mt-6 ">
        {/* ===== SIDEBAR ===== */}
        <div className="w-64 bg-white shadow p-5">
          {/* Logo */}
          <div className="h-6 w-32 bg-gray-300 rounded mb-8 animate-pulse"></div>

          {/* Profile */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-gray-300 rounded-full animate-pulse"></div>

            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>

              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Menu */}
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gray-200 rounded mb-3 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
      
    </React.Fragment>
  );
}

export default RootSkelton;
