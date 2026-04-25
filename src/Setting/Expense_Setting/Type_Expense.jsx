import React, { useMemo, useState } from "react";
import { useDataContext } from "../../Context";

function Type_Expense() {
  const { typeExpense } = useDataContext();
  const iconMap = {
    Salaries: "fa-solid fa-bag-shopping",
    Maintenance: "fa-solid fa-screwdriver-wrench",
    Utilities: "fa-brands fa-superpowers",
    Stationery: "fa-solid fa-file-pen",
    "Events & Catering": "fa-brands fa-angellist",
  };
  const bgMap = {
    Salaries: "bg-gray-200",
    Maintenance: "bg-orange-100",
    Utilities: "bg-yellow-100",
    Stationery: "bg-gray-200",
    "Events & Catering": "bg-orange-100",
  };
  const bgMapHover = {
    Salaries: "bg-blue-950 text-white",
    Maintenance: "bg-red-700 text-white",
    Utilities: "bg-yellow-950 text-white",
    Stationery: "bg-blue-950 text-white",
    "Events & Catering": "bg-red-700 text-white",
  };
  const newDatas = useMemo(
    () =>
      typeExpense.map((item) => ({
        ...item,
        icon: iconMap[item.name] || "❓",
        bgIcon: bgMap[item.name] || "",
        bgIconHover: bgMapHover[item.name] || "",
      })),
    [typeExpense],
  );
  const [changeBgHover, setChangeBgHover] = useState(null);
  const [hoverId, setHoverId] = useState(null);

  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {newDatas?.map((type) => (
          <div
            key={type.expense_type_id}
            onMouseEnter={() => {
              setHoverId(type.expense_type_id);
              setChangeBgHover(type?.bgIconHover);
            }}
            onMouseLeave={() => {
              setHoverId(null);
              setChangeBgHover(null);
            }}
            className="group p-6 bg-white rounded-xl shadow-xl 
      transition-all duration-300 flex flex-col gap-4 border border-transparent"
          >
            {/* Top */}
            <div className="flex justify-between items-center">
              <i
                className={`${type.icon} text-2xl px-3 py-2.5 rounded-xl transition duration-300 ${
                  hoverId === type.expense_type_id ? changeBgHover : type.bgIcon
                }`}
              ></i>

              <span className="flex items-center gap-4 text-gray-400">
                <i className="fa-solid fa-pen hover:text-blue-600 cursor-pointer"></i>
                <i className="fa-regular fa-trash-can hover:text-red-600 cursor-pointer"></i>
              </span>
            </div>

            {/* Body */}
            <div>
              <h2 className="text-xl my-2 font-semibold group-hover:text-blue-950 transition">
                {type.name}
              </h2>
              <p className="text-sm text-gray-700 line-clamp-2">
                {type.description}
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-sm text-gray-900 mt-6">
              <h2 className="font-medium">CODE: {type.code}</h2>
              <p
                className={`group-hover:text-blue-700 transition text-xs ${type?.bgIcon} px-2 py-1 rounded-full`}
              >
                {type.type}
              </p>
            </div>
          </div>
        ))}
        <div className="border-2 border-gray-200 rounded-md flex flex-col justify-center items-center gap-3 cursor-pointer">
            <i className="fa-solid fa-plus text-2xl bg-gray-300 text-gray-400 p-4 rounded-full"></i>
           <h2 className="text-gray-400 text-sm font-medium">Create New Type Expenses</h2>
           <p className="text-gray-400 text-xs text-center">Define a new budgetary segment for the next fiscal year.</p>
        </div>
      </div>
    </div>
  );
}

export default Type_Expense;
