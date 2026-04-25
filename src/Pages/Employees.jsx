import { Outlet } from "react-router-dom";
import { ListEmployees } from "../Employees/ListEmployees";
import Cart_Employee from "../Employees/Cart_Employee";
import { useDataContext } from "../Context";
import { useState } from "react";
function Employees() {
  const { setEmployees, setFormEmployees, formEmployees, initialEmployee } =
    useDataContext();
  const [update, setUpdate] = useState(false);
  const [profile, setProfile] = useState(false);
  return (
    <div className="bg-white p-2 rounded md:mr-4 flex flex-col gap-4">
      {/* Header */}
      {formEmployees ? (
        ""
      ) : (
        <div className="flex items-center justify-between mr-1">
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-list text-sm md:text-xl text-gray-700"></i>
            <h2 className="text-sm md:text-xl font-bold text-gray-700">
              Employees List
            </h2>
          </span>

          <span
            className="flex items-center gap-1 bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 px-2 py-0.5 md:px-3 md:py-1 md:mr-4 rounded cursor-pointer"
            onClick={() => {
              setEmployees(initialEmployee);
              setFormEmployees(true);
              setUpdate(true);
              setProfile(false);
            }}
          >
            <h2 className="text-sm font-medium text-white">Add New Employee</h2>
            <i className="fa-solid fa-plus text-sm text-white"></i>
          </span>
        </div>
      )}
      <Cart_Employee />
      <ListEmployees
        update={update}
        setUpdate={setUpdate}
        profile={profile}
        setProfile={setProfile}
      />
      <Outlet />
    </div>
  );
}

export default Employees;
