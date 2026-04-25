import React from "react";
import { useDataContext } from "../Context";

function List_Expenses_Report() {
  const { storeReportData } = useDataContext();
  console.log("store", storeReportData);
  return (
    <React.Fragment>
      {storeReportData?.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4 min-h-[72vh]">
          <h2 className="text-3xl text-gray-700 font-bold">
            No expense records found.
          </h2>
          <p className="text-[17px] text-gray-600 font-medium">
            Student expense list is currently empty.
          </p>
        </div>
      ) : (
        <table className="border border-gray-200 mt-3 min-w-full text-[12px] md:text-[15px]">
          <thead className="bg-purple-200">
            <tr>
              <th className="p-1 md:px-4 md:py-2 text-left border-l">
                Category Name
              </th>

              <th className="p-1 md:px-4 md:py-2 text-left">Expenses Date</th>

              <th className="p-1 md:px-4 md:py-2 text-left">Expenses Amount</th>

              <th className="p-1 md:px-4 md:py-2 text-left">Paid Type</th>

              <th className="p-1 md:px-4 md:py-2 text-left hidden xl:table-cell">
                Description
              </th>
              <th className="p-1 md:px-4 md:py-2 text-left hidden xl:table-cell">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {storeReportData?.map((exp, idx) => (
              <tr
                key={idx}
                className={
                  idx % 2 === 0
                    ? "bg-white"
                    : "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-100"
                }
              >
                <td className="p-1 md:px-4 md:py-2 text-left border-l">
                  {exp?.categories_name}
                </td>
                <td className="p-1 md:px-4 md:py-2 text-left">
                  {exp?.expenses_date?.slice(0, 10)}
                </td>
                <td className="p-1 md:px-4 md:py-2 text-left">
                  ${exp?.expenses_amount}
                </td>
                <td className="p-1 md:px-4 md:py-2 text-left">
                  {exp?.paid_by}
                </td>
                <td className="p-1 md:px-4 md:py-2 text-left hidden xl:table-cell">
                  {exp?.expenses_description}
                </td>
                <td className="p-1 md:px-4 md:py-2 text-left hidden xl:table-cell">
                  {exp?.created_at?.slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </React.Fragment>
  );
}

export default List_Expenses_Report;
