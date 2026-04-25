import React, { useState } from "react";
import Form_Student from "./Form_Student";
import { useDataContext } from "../Context";
import Form_Payment from "./Form_Payment";
import Student_Table from "./Student_Table";
import PaymentTabs from "./PaymentTabs";
import SearchStudentPayment from "./SearchStudentPayment";
import Pagination from "../Pagination/Pagination";

const pageFilter = [
  { id: 1, value: 10, name_page: "10" },
  { id: 2, value: 20, name_page: "20" },
  { id: 3, value: 40, name_page: "40" },
  { id: 4, value: 60, name_page: "60" },
  { id: 5, value: 100, name_page: "100" },
];

function List_Student() {
  const {
    newStudent,
    setNewStudent,
    showFormPayment,
    setShowFormPayment,
    paidStudentType,
    type,
    setType,
    handleDeleteStudent,
    handleReactiveStudent,
    auth,
    paginate,
    pages,
    setPages,
    startDate,
    endDate,
    setPayment,
    changeEdit,
    setChangeEdit,
  } = useDataContext();

  const [filterPageHidden, setFIlterPageHidden] = useState(false);

  const { page, limit } = pages.accounting;

  // =========================
  // Detect filter mode
  // =========================
  const isFiltering = startDate && endDate;

  const currentPage = isFiltering
    ? pages.searchByDate.page
    : pages.accounting.page;

  const currentLimit = isFiltering
    ? pages.searchByDate.limit
    : pages.accounting.limit;

  const total = paginate?.totalItems || 0;

  const start =
    paidStudentType.length === 0 ? 0 : (currentPage - 1) * currentLimit + 1;

  const end = Math.min(currentPage * currentLimit, total);

  // =========================
  // Change limit handler
  // =========================
  const handleChangeLimit = (value) => {
    if (isFiltering) {
      setPages((pre) => ({
        ...pre,
        searchByDate: {
          ...pre.searchByDate,
          page: 1,
          limit: value,
        },
      }));
    } else {
      setPages((pre) => ({
        ...pre,
        accounting: {
          ...pre.accounting,
          page: 1,
          limit: value,
        },
      }));
    }

    setFIlterPageHidden(false);
  };

  return (
    <div>
      {!newStudent && (
        <div className="flex flex-col gap-4">
          {/* ===== Header ===== */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-list text-sm md:text-xl text-gray-700"></i>
              <h2 className="text-sm md:text-xl font-bold text-gray-700">
                Payment List
              </h2>
            </div>

            {auth?.role === "Accounting" && (
              <div className="flex items-center gap-2">
                <div
                  className="bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 px-2 py-1 cursor-pointer rounded"
                  onClick={() => setNewStudent(true)}
                >
                  <h2 className="text-white text-sm font-medium">
                    Add New Student
                  </h2>
                </div>

                <div
                  className="bg-gradient-to-r from-purple-400 via-blue-500 to-blue-600 px-2 py-1 cursor-pointer rounded"
                  onClick={() => {
                    setShowFormPayment(true);
                    setPayment("");
                  }}
                >
                  <h2 className="text-white text-sm font-medium">
                    Add Payment
                  </h2>
                </div>
              </div>
            )}
          </div>

          {/* ===== Search + Tabs ===== */}
          <SearchStudentPayment />
          <PaymentTabs setType={setType} />

          {/* ===== Filter Button ===== */}
          <div
            onClick={() => setFIlterPageHidden(true)}
            className="absolute right-4 sm:right-8 xl:right-6 sm:top-49 top-62 flex items-center gap-2 cursor-pointer border hover:bg-gray-200 px-2 py-1"
          >
            <i className="fa-solid fa-bars-staggered text-sm"></i>
            <h2 className="text-sm font-medium text-gray-700">Filter</h2>
          </div>

          {/* ===== Page Limit Filter ===== */}
          <div
            className={`absolute right-32 top-55 cursor-pointer bg-[#1a1a1aee] backdrop-blur-md rounded-lg shadow-xl py-2 px-3 flex flex-col gap-2 transition-all duration-300
              ${filterPageHidden ? "opacity-100 scale-100 z-50" : "opacity-0 scale-0 z-0"}`}
            onMouseLeave={() => setFIlterPageHidden(false)}
          >
            {pageFilter.map((item) => (
              <h2
                key={item.id}
                className="text-white hover:text-blue-400"
                onClick={() => handleChangeLimit(item.value)}
              >
                {item.name_page}
              </h2>
            ))}
          </div>

          {/* ===== Table ===== */}
          <Student_Table
            paidedPayment={paidStudentType}
            type={type}
            handleDeleteStudent={handleDeleteStudent}
            handleReactiveStudent={handleReactiveStudent}
            setChangeEdit={setChangeEdit}
          />

          {/* ===== Pagination Info ===== */}
          {paidStudentType.length > 0 && (
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs sm:text-sm text-gray-600">
                Showing {start} - {end} of {total}
              </p>

              <div className="xl:mr-4">
                <Pagination
                  module={isFiltering ? "searchByDate" : "accounting"}
                  totalPages={paginate?.totalPages || 1}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== Forms ===== */}
      {showFormPayment && (
        <Form_Payment changeEdit={changeEdit} setChangeEdit={setChangeEdit} />
      )}
      {newStudent && <Form_Student />}
    </div>
  );
}

export default List_Student;
