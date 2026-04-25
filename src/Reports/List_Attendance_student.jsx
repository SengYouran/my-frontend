import React from "react";
import { useDataContext } from "../Context";

function List_Attendance_student() {
  const { storeReportData } = useDataContext();
  return (
    <div>
      {storeReportData?.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4 min-h-[72vh]">
          <h2 className="text-3xl text-gray-700 font-bold">
            No attendance records found.
          </h2>
          <p className="text-[17px] text-gray-600 font-medium">
            Student attendance list is currently empty.
          </p>
        </div>
      ) : (
        <table className="border border-gray-200 mt-3 min-w-full">
          <thead className="bg-purple-200">
            <tr>
              <th className="p-1 md:px-4 md:py-2 text-left border-l-2">Name</th>
              <th className="p-1 md:px-4 md:py-2 text-left hidden md:table-cell">
                Telephone
              </th>
              <th className="p-1 md:px-4 md:py-2 text-left">
                Attendance Status
              </th>
              <th className="p-1 md:px-4 md:py-2 text-left">Attendance Date</th>
              <th className="p-1 md:px-4 md:py-2 text-left hidden xl:table-cell">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {storeReportData?.map((att, idx) => (
              <tr
                key={idx}
                className={`${idx % 2 === 0 ? "bg-white" : "bg-gradient-to-r from-blue-50 via-blue-100  to-blue-100"}`}
              >
                <td className="p-1 md:px-4 md:py-2 border-l-2">
                  {att?.last_name} {att?.first_name}
                </td>
                <td className="p-1 md:px-4 md:py-2 hidden md:table-cell">
                  {att?.telephone}
                </td>
                <td className="p-1 md:px-4 md:py-2">
                  {att?.attendance_status}
                </td>
                <td className="p-1 md:px-4 md:py-2">
                  {att?.attendance_date?.slice(0, 10)}
                </td>
                <td className="p-1 md:px-4 md:py-2 hidden xl:table-cell">
                  {att?.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default List_Attendance_student;
