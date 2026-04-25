import React from "react";
import { useDataContext } from "../Context";
import SkeletonExpenses from "./SkeletonExpenses";

function Expenses_table() {
  const { storeExpenses, loadingEmployee } = useDataContext();
  if (loadingEmployee) {
    return <SkeletonExpenses />;
  }
  return (
    <React.Fragment>
      {storeExpenses?.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4 min-h-[80vh]">
          <h2 className="text-3xl text-gray-700 font-bold">
            No expenses records found.
          </h2>
          <p className="text-[17px] text-gray-600 font-medium">
            expenses list is currently empty.
          </p>
        </div>
      ) : (
        <table className="border border-gray-200 mt-3 min-w-full text-[12px] md:text-[15px]">
          <thead className="bg-purple-200">
            <tr>
              <th className="p-1 md:px-4 md:py-2 text-left border-l">
                Expenses Code
              </th>
              <th className="p-1 md:px-4 md:py-2 text-left">
                Category Name
              </th>

              <th className="p-1 md:px-4 md:py-2 text-left">Expenses Date</th>

              <th className="p-1 md:px-4 md:py-2 text-left">Expenses Amount</th>

              <th className="p-1 md:px-4 md:py-2 text-left">Paid Type</th>

              <th className="p-1 md:px-4 md:py-2 text-left hidden xl:table-cell">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {storeExpenses?.map((exp, idx) => (
              <tr
                key={idx}
                className={
                  idx % 2 === 0
                    ? "bg-white"
                    : "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-100"
                }
              >
                <td className="p-1 md:px-4 md:py-2 text-left border-l">
                  {exp?.code}
                </td>
                <td className="p-1 md:px-4 md:py-2 text-left">
                  {exp?.categories_name}
                </td>
                <td className="p-1 md:px-4 md:py-2 text-left">
                  {exp?.expenses_date.slice(0, 10)}
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </React.Fragment>
  );
}

export default Expenses_table;
