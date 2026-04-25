import React from "react";
import { useDataContext } from "../Context";

function SkeletonTableEmployee() {
  const { listEmployee } = useDataContext();
  return (
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
        {listEmployee?.results?.map((_, idx) => (
          <tr
            key={idx}
            className={`${
              idx % 2 === 0
                ? "bg-white"
                : "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-100"
            }`}
          >
            {[...Array(6)].map((__, colIdx) => (
              <td key={colIdx} className="px-2 py-3">
                <div className="h-4 w-full rounded bg-gray-300 animate-pulse"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SkeletonTableEmployee;
