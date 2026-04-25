import React from "react";
import { useDataContext } from "../Context";

function DashboardSkeleton() {
  const { auth } = useDataContext();
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* ===== MAIN ===== */}
      <div className="flex-1">
        {/* CONTENT */}
        <div className="p-6">
          {/* Cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
            {[...Array(12)].map((_, index) => (
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
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="h-5 w-40 bg-gray-300 rounded mb-4 animate-pulse"></div>

              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <div className="h-5 w-40 bg-gray-300 rounded mb-4 animate-pulse"></div>

              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSkeleton;
