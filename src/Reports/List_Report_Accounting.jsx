import React from "react";
import { useDataContext } from "../Context";

function List_Report_Accounting() {
  const { storeReportData } = useDataContext();
  return (
    <div className="mt-2 ">
      <div className="overflow-x-auto">
        {storeReportData?.length === 0 ?<div className="flex flex-col justify-center items-center gap-4 min-h-[70vh]">
          <h2 className="text-3xl text-gray-700 font-bold">
            No income or unpaid records found.
          </h2>
          <p className="text-[17px] text-gray-600 font-medium">
            Student income or unpaid list is currently empty.
          </p>
        </div>:
        
        <table className="min-w-full border border-purple-200 mt-2 text-[12px] md:text-[15px]">
          <thead className="bg-purple-200">
            <tr>
              <th className="xl:p-2 p-1 text-left border-l-2">Name</th>
              <th className="xl:p-2 p-1 text-left">Telephone</th>
              <th className="xl:p-2 p-1 text-left">Amount</th>
              <th className="xl:p-2 p-1 text-left">Transport Fee</th>
              <th className="xl:p-2 p-1 text-left hidden md:table-cell">
                Pay Type
              </th>
              <th className="xl:p-2 p-1 text-left hidden xl:table-cell">
                Transport Type
              </th>
              <th className="xl:p-2 p-1 text-left hidden xl:table-cell">
                Period Start
              </th>
              <th className="xl:p-2 p-1 text-left hidden xl:table-cell">
                Period End
              </th>
              <th className="xl:p-2 p-1 text-left hidden xl:table-cell">
                Pay Status
              </th>
              <th className="xl:p-2 p-1 text-left">Create At</th>
            </tr>
          </thead>

          <tbody>
            {storeReportData?.map((stu, idx) => (
              <tr
                key={stu.student_id + stu.created_at}
                className={
                  idx % 2 === 0
                    ? "bg-white"
                    : "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-100"
                }
              >
                <td className="xl:p-2 p-1 border-l-2">
                  {stu?.last_name} {stu?.first_name}
                </td>
                <td className="xl:p-2 p-1">{stu?.telephone}</td>
                <td className="xl:p-2 p-1">{stu?.amount} $</td>

                <td className="xl:p-2 p-1">
                  {Number(stu?.transport_fee) === 0
                    ? "N/A"
                    : `${stu?.transport_fee} $`}
                </td>

                <td className="xl:p-2 p-1 hidden md:table-cell">
                  {stu?.pay_type}
                </td>
                <td className="xl:p-2 p-1 hidden xl:table-cell">
                  {stu?.transport_type}
                </td>

                <td className="xl:p-2 p-1 hidden xl:table-cell">
                  {stu?.period_start?.slice(0, 10)}
                </td>
                <td className="xl:p-2 p-1 hidden xl:table-cell">
                  {stu?.period_end?.slice(0, 10)}
                </td>

                <td className="xl:p-2 p-1 hidden xl:table-cell">
                  {stu?.pay_status === "Paid" ? "Paid" : "Unpaid"}
                </td>
                <td className="xl:p-2 p-1 hidden xl:table-cell">
                  {stu?.created_at?.slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        }
      </div>
    </div>
  );
}

export default List_Report_Accounting;
