import React from "react";

function SkeletonDashboardAccounting() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* ===== MAIN ===== */}
      <div className="flex-1">
        {/* CONTENT */}
        <div className="p-6">
          {/* Cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow">
                <div className="flex justify-center items-center gap-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse"></div>

                  <div className="flex flex-col gap-2">
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>

                    <div className="w-10 h-6 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-6 mb-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow">
                <div className="flex justify-center items-center gap-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse"></div>

                  <div className="flex flex-col gap-2">
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>

                    <div className="w-10 h-6 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex justify-center items-center ">
                <div className="h-4 w-30 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2 mb-2">
                  <div className="h-2 w-20 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-2 w-20 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-2 w-20 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="h-2 w-20 bg-gray-300 rounded mb-2 animate-pulse"></div>
              </div>

              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex justify-center items-center ">
                <div className="h-4 w-30 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2 mb-2">
                  <div className="h-2 w-20 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-2 w-20 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-2 w-20 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="h-2 w-20 bg-gray-300 rounded mb-2 animate-pulse"></div>
              </div>

              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="bg-white p-4 mt-4 rounded-xl shadow">
            <div className="flex justify-center items-center ">
              <div className="h-4 w-30 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2 mb-2">
                <div className="h-2 w-20 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-2 w-20 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-2 w-20 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="h-2 w-20 bg-gray-300 rounded mb-2 animate-pulse"></div>
            </div>

            <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonDashboardAccounting;
