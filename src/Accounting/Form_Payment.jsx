import React, { useRef, useState, useEffect } from "react";
import { useDataContext } from "../Context";

function Form_Payment({ changeEdit, setChangeEdit }) {
  const refPeriodStart = useRef(null);
  const refPeriodEnd = useRef(null);
  const dropdownRef = useRef(null);

  const {
    setShowFormPayment,
    handleChangePaymentStudent,
    insertPaymentStudent,
    payment,
    loading,
    studentSearch,
    searchStudentPayment,
    setSearchStudentPayment,
    searchLoading,
    updatePaymentStudent,
    loadingAccounting,
  } = useDataContext();
  const [showDropdown, setShowDropdown] = useState(false);
  /*
  const studentActive = dataStudent?.filter((check) => check?.is_active === 1);

  const filteredStudent = studentActive?.filter((stu) =>
    `${stu.student_id} ${stu.last_name} ${stu.first_name}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  // Close dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync search text when payment.student_id changes
  useEffect(() => {
    if (payment?.student_id) {
      const selected = studentActive?.find(
        (s) => s.student_id === payment.student_id,
      );
      if (selected) {
        setSearch(
          `${selected.student_id} - ${selected.last_name} ${selected.first_name}`,
        );
      }
    } else {
      setSearch("");
    }
  }, [payment?.student_id, dataStudent]);
*/

  return (
    <React.Fragment>
      {/* MODAL */}
      <div className="fixed inset-0 z-85 flex items-center justify-center p-3">
        <div className="bg-white w-full max-w-lg h-[95vh] sm:h-auto sm:max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
            Payment Form
          </h2>

          <form className="mt-4 flex flex-col gap-4">
            {/* STUDENT SEARCH */}
            <div className="flex flex-col gap-1 relative" ref={dropdownRef}>
              <label className="text-sm font-medium">Student*</label>

              <input
                type="text"
                placeholder="Search student..."
                value={
                  searchStudentPayment ||
                  `${payment?.student_id || ""} ${payment?.last_name || ""} ${payment?.first_name || ""}`
                }
                onChange={(e) => {
                  setSearchStudentPayment(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              />
              {showDropdown && (
                <div
                  className="absolute top-full left-0 w-full bg-white border rounded-md max-h-44 overflow-y-auto shadow-lg z-50"
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  {searchLoading ? (
                    <div className="flex justify-center items-center gap-2 py-4">
                      <div className="w-2 h-4 bg-blue-500 rounded loader"></div>
                      <div className="w-2 h-4 bg-purple-500 rounded loader"></div>
                      <div className="w-2 h-4 bg-pink-500 rounded loader"></div>
                    </div>
                  ) : studentSearch?.length > 0 ? (
                    studentSearch.map((stu, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => {
                          setSearchStudentPayment(
                            `${stu.student_id} - ${stu.last_name} ${stu.first_name}`,
                          );
                          setShowDropdown(false);

                          handleChangePaymentStudent({
                            target: {
                              name: "student_id",
                              value: stu.student_id,
                            },
                          });
                        }}
                      >
                        {stu.student_id} - {stu.last_name} {stu.first_name}
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-gray-400 text-sm">
                      No student found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* PAYMENT */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Payment*</label>
              <input
                type="text"
                name="amount"
                placeholder="example: 120"
                value={payment?.amount ?? ""}
                onChange={handleChangePaymentStudent}
                className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* PAYMENT TYPE */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Type Payment*</label>
              <select
                name="pay_type"
                value={payment?.pay_type ?? ""}
                onChange={handleChangePaymentStudent}
                className="border rounded-md px-3 py-2 text-sm outline-none"
              >
                <option value="">Payment Type</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            {/* TRANSPORT */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Transport Type*</label>
              <select
                name="transport_type"
                value={payment?.transport_type ?? ""}
                onChange={handleChangePaymentStudent}
                className="border rounded-md px-3 py-2 text-sm outline-none"
              >
                <option value="">Transport Type</option>
                <option value="School Bus">School Bus</option>
                <option value="Own Vehicle">Own Vehicle</option>
              </select>
            </div>

            {/* TRANSPORT FEE */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Transport Fee*</label>
              <input
                type="text"
                name="transport_fee"
                placeholder="0.00"
                value={payment?.transport_fee ?? ""}
                onChange={handleChangePaymentStudent}
                className="border rounded-md px-3 py-2 text-sm outline-none"
              />
            </div>

            {/* DATE GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Period Start*</label>
                <input
                  ref={refPeriodStart}
                  type="date"
                  name="period_start"
                  value={payment?.period_start ?? ""}
                  onChange={handleChangePaymentStudent}
                  onClick={() => refPeriodStart.current?.showPicker?.()}
                  className="border rounded-md px-3 py-2 text-sm cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Period End*</label>
                <input
                  ref={refPeriodEnd}
                  type="date"
                  name="period_end"
                  value={payment?.period_end ?? ""}
                  onChange={handleChangePaymentStudent}
                  onClick={() => refPeriodEnd.current?.showPicker?.()}
                  className="border rounded-md px-3 py-2 text-sm cursor-pointer"
                />
              </div>
            </div>

            {/* STATUS */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Pay Status*</label>
              <select
                name="pay_status"
                value={payment?.pay_status ?? ""}
                onChange={handleChangePaymentStudent}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="">Payment Status</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>

            {/* BUTTONS */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <button
                type="button"
                onClick={() => {
                  setShowFormPayment(false);
                  setChangeEdit(false);
                }}
                className="border cursor-pointer rounded-md py-2 text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              {changeEdit ? (
                <h2
                  className="cursor-pointer text-center rounded-md py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
                  onClick={() => {
                    updatePaymentStudent(payment?.student_id);
                  }}
                >
                  {loadingAccounting ? "Updating..." : "Update"}
                </h2>
              ) : (
                <button
                  type="button"
                  onClick={insertPaymentStudent}
                  className="cursor-pointer rounded-md py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/40 z-80"
        onClick={() => setShowDropdown(false)}
      ></div>
    </React.Fragment>
  );
}

export default Form_Payment;
