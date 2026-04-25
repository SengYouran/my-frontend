import React, { useState } from "react";
import SkeltonStudentPayment from "./SkeltonStudentPayment";
import { useDataContext } from "../Context";

const expire_type_active_deactive = [
  { type: "Unpaid", text: "Current Unpaid" },
  { type: "OVERDUE", text: "OVERDUE" },
];

function Student_Table({
  paidedPayment = [],
  handleDeleteStudent,
  handleReactiveStudent,
  setChangeEdit,
}) {
  const {
    loadingAccounting,
    auth,
    type,
    setType,
    setFormStudent,
    setNewStudent,
    setShowFormPayment,
    setPayment,
  } = useDataContext();
  if (loadingAccounting) {
    return <SkeltonStudentPayment />;
  }
  return (
    <div className="flex flex-col gap-4">
      {/* Filter Buttons */}
      {(type === "Unpaid" || type === "OVERDUE") && (
        <div className="flex items-center gap-4 mt-2">
          {expire_type_active_deactive.map((expire) => (
            <div
              key={expire.type}
              onClick={() => {
                setType(expire?.type);
              }}
              className={`px-3 py-1 rounded-md text-[14px] font-medium cursor-pointer transition-all duration-200
                ${
                  expire?.type === type
                    ? "text-white bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600"
                    : "text-black border border-gray-400 hover:bg-gray-200"
                }`}
            >
              {expire.text}
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 mt-2 text-[12px] md:text-[15px]">
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
              <th className="xl:p-2 p-1 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {paidedPayment?.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-10 text-gray-600">
                  No student records found.
                </td>
              </tr>
            ) : (
              paidedPayment?.map((stu, idx) => (
                <tr
                  key={`${stu.student_id}-${idx}`}
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

                  <td className="xl:p-2 p-1 flex items-center gap-2">
                    {type === "Unpaid" || type === "OVERDUE" ? "":<button
                      onClick={() => {
                        const StudentEdit = {
                          ...stu,
                          period_start: stu?.period_start
                            ? new Date(stu.period_start)
                                .toISOString()
                                .slice(0, 10)
                            : "",
                          period_end: stu?.period_end
                            ? new Date(stu.period_end)
                                .toISOString()
                                .slice(0, 10)
                            : "",
                        };
                        setPayment(StudentEdit);
                        setShowFormPayment(true);
                        setChangeEdit(true);
                      }}
                      disabled={auth?.role === "Admin"}
                      className="text-white cursor-pointer text-[12px] md:text-[14px] bg-yellow-500 px-2 py-0.5 md:px-3 md:py-1 rounded-md hover:opacity-90 transition
    disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Edit
                    </button>}
                    {type === "Unpaid" || type === "OVERDUE" ? (
                      <button
                        onClick={() => handleReactiveStudent(stu?.student_id)}
                        className={`text-white text-[12px] md:text-[14px] px-2 py-0.5 md:px-3 md:py-1 rounded-md
    bg-gradient-to-r from-green-300 via-green-500 to-green-600
    hover:opacity-90 transition
    disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
                        disabled={auth?.role === "Admin"} // disables if NOT Admin
                      >
                        Reactive
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDeleteStudent(stu?.student_id)}
                        disabled={auth?.role === "Admin"} // disables if NOT Admin
                        className="text-white cursor-pointer text-[12px] md:text-[14px] bg-gradient-to-r from-red-300 via-red-500 to-red-600 px-2 py-0.5 md:px-3 md:py-1 rounded-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Deactive
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student_Table;
