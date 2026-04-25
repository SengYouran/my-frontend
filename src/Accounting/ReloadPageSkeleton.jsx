import React from "react";

function ReloadPageSkeleton() {
  return (
    <div>
      <table className="border border-gray-200 mt-3 w-full">
        <thead className="bg-gray-200">
          <tr>
            {[
              "Name",
              "Telephone",
              "Amount",
              "Transport Fee",
              "Pay Type",
              "Transport Type",
              "Period Start",
              "Period End",
              "Pay Status",
              "Action",
            ].map((ch, idx) => (
              <th
                key={idx}
                className="px-2 py-2 text-[14px] text-left border-l"
              >
                {ch}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {[...Array(10)].map((_, idx) => (
            <tr
              key={idx}
              className={`${
                idx % 2 === 0
                  ? "bg-white"
                  : "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-100"
              }`}
            >
              {[...Array(10)].map((__, colIdx) => (
                <td key={colIdx} className="px-2 py-3">
                  <div className="h-4 w-full rounded bg-gray-300 animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReloadPageSkeleton;
