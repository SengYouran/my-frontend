import React from "react";
import Type_Expense from "./Expense_Setting/Type_Expense";

function Expenses_Categories() {
  return (
    <div className="min-h-screen bg-gray-50 p-2 lg:px-8 lg:py-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
        <p className="text-red-600 text-sx">International Finance</p>
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Expense Categories</h2>
        <h3 className="text-sm text-gray-700 w-1/2">
          Organize and curate your institution's financial outflows with custom
          categories for precise reporting and scholarly oversight.
        </h3>
      </div>
        <div className="bg-blue-950 p-2 rounded-md hover:bg-blue-900 cursor-pointer flex items-center gap-2">
          <i className="fa-solid fa-plus text-xs border-2 text-white border-white p-1 rounded-full"></i>
          <h2 className="text-white text-sm font-bold">Create New Type Expenses</h2>
        </div>
      </div>
      <Type_Expense />
    </div>
  );
}

export default Expenses_Categories;
