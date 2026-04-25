import React from "react";
import { useDataContext } from "../Context";

function SkeletonDashboardTeacher() {
  const { topRankStudent } = useDataContext();
  return (
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
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="h-5 w-40 bg-gray-300 rounded mb-4 animate-pulse"></div>

            <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="h-5 w-40 bg-gray-300 rounded mb-4 animate-pulse"></div>

            <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="bg-white p-6 mt-4">
          <div className="w-40 h-6 bg-gray-200 rounded animate-pulse"></div>
          <table className="border border-gray-200 mt-3 w-full">
            <thead className="bg-gray-200">
              <tr>
                {[...Array(6)].map((ch, idx) => (
                  <th
                    key={idx}
                    className="px-2 py-4 text-[14px] text-left border-l border-gray-400"
                  >
                    {ch}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {topRankStudent.map((_, idx) => (
                <tr
                  key={idx}
                  className={`${
                    idx % 2 === 0
                      ? "bg-white"
                      : "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-100"
                  }`}
                >
                  {topRankStudent.map((__, colIdx) => (
                    <td key={colIdx} className="px-2 py-3">
                      <div className="h-4 w-full rounded bg-gray-300 animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SkeletonDashboardTeacher;
