import React from "react";
import { useDataContext } from "../Context";
import { NavLink } from "react-router-dom";

function Small_Profile() {
  const { OneEmp, setShowHidden } = useDataContext();
  return (
    <div className="flex md:hidden justify-between items-center bg-white shadow-[0_4px_10px_rgba(59,130,246,0.2)] p-2 rounded-xl fixed top-0 left-0 z-70 w-full">
      <NavLink to={"/account"} className="cursor-pointer">
        <div className="flex items-center gap-2">
          <img
            className="w-10 h-10 rounded-[50%] border-white border-2 bg-gradient-to-r from-blue-500 to-purple-600 p-1"
            src={`http://localhost:3000/uploads/${OneEmp?.profile}`}
            alt="Proile Employee"
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-[13px] font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              {OneEmp?.last_name} {OneEmp?.first_name}
            </h2>

            <p className="text-gray-800 font-medium text-[10px]">
              {OneEmp?.roles}
            </p>
            <p className="text-gray-700 font-medium text-[10px]">
              ID: {OneEmp?.emp_id}
            </p>
          </div>
        </div>
      </NavLink>
      <div
        className="grid grid-cols-2 gap-1 cursor-pointer group"
        onClick={() => setShowHidden(true)}
      >
        <div className="bg-gray-900 w-3 h-3 rounded"></div>
        <div className="bg-gray-900 w-3 h-3 rounded"></div>
        <div className="bg-gray-900 w-3 h-3 rounded"></div>
        <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-purple-500 w-3 h-3 rounded transition-all duration-500 rotate-145 group-hover:rotate-0"></div>
      </div>
    </div>
  );
}

export default Small_Profile;
