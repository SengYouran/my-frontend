import React, { useState } from "react";
import Form_Categories from "./Form_Categories";
import Form_Expenses from "./Form_Expenses";
import Expenses_table from "./Expenses_table";
import { useDataContext } from "../Context";
import Pagination from "../Pagination/Pagination";

function Expenses_list() {
  const {
    showCategoryForm,
    showExpensesForm,
    setShowCategoryForm,
    setShowExpensesForm,
    storeExpenses,
    pages,
    expensePaginate,
    auth,
  } = useDataContext();
  const { page } = pages.expenses;
  const end = Math.min(
    page * expensePaginate?.limit,
    expensePaginate?.totalItems,
  );
  return (
    <div className="bg-white p-2 rounded md:mr-4">
      <div className="flex justify-between items-center flex-wrap md:flex-nowrap">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-list text-sm md:text-xl text-gray-700"></i>
          <h2 className="text-sm md:text-xl font-bold text-gray-700">
            Payment List
          </h2>
        </div>
        {auth?.role === "Accounting" && (
          <div className="flex items-center gap-2">
            <div
              className="bg-gradient-to-r  from-blue-400 via-purple-500 to-purple-600 px-1 py-0.5 md:px-3 md:py-1 cursor-pointer rounded"
              onClick={() => setShowCategoryForm(true)}
            >
              <h2 className="text-center text-white text-xs md:text-[15px] font-medium">
                Add New Categories
              </h2>
            </div>
            <div
              className="bg-gradient-to-r  from-purple-400 via-blue-500 to-blue-600 px-1 py-0.5 md:px-3 md:py-1 cursor-pointer rounded"
              onClick={() => setShowExpensesForm(true)}
            >
              <h2 className="text-center text-white text-xs md:text-[15px] font-medium">
                Add New Expenses
              </h2>
            </div>
          </div>
        )}
      </div>
      <Expenses_table />
      {storeExpenses.length === 0 ? (
        ""
      ) : (
        <div className="flex justify-between items-center gap-4 mt-2">
          <p className="text-sm text-gray-600">
            Showing {storeExpenses.length === 0 ? 0 : ""} -{" "}
            {Math.min(end, storeExpenses.length)} of {storeExpenses.length}
            expenses
          </p>

          <div className="mr-4">
            <Pagination
              module={"expenses"}
              totalPages={expensePaginate?.totalPages}
            />
          </div>
        </div>
      )}
      {showExpensesForm && <Form_Expenses />}
      {showCategoryForm && (
        <Form_Categories
          setShowCategoryForm={setShowCategoryForm}
          setShowExpensesForm={setShowExpensesForm}
        />
      )}
    </div>
  );
}

export default Expenses_list;
