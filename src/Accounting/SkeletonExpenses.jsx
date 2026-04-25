import React from "react";
import { useDataContext } from "../Context";

function SkeletonExpenses() {
  const { storeExpenses } = useDataContext();
  return (
    <table className="min-w-full">
      <thead className="bg-gray-200">
        <tr>
          {[...Array(5)].map((_, idx) => (
            <th
              key={idx}
              className="px-4 py-2 text-left border-l border-gray-500"
            >
              &nbsp;
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {storeExpenses.map((_, idx) => (
          <tr
            key={idx}
            className={`${
              idx % 2 === 0
                ? "bg-white"
                : "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-100"
            }`}
          >
            {/* Columns */}
            {storeExpenses.map((__, colIdx) => (
              <td key={colIdx} className="px-4 py-3">
                <div className="h-4 w-full rounded bg-gray-300 animate-pulse" />
              </td>
            ))}

            {/* Action column */}
            <td className="px-4 py-3">
              <div className="h-6 w-20 mx-auto rounded bg-gray-300 animate-pulse" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SkeletonExpenses;
