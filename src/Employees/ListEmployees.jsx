import React from "react";
import { useDataContext } from "../Context";
import Pagination from "../Pagination/Pagination";
import EmployeeTable from "./EmployeeTable";
import FormEmployee from "./Form_Employee";

function ListEmployees({ update, setUpdate, profile, setProfile }) {
  const {
    listEmployee,
    employees,
    formEmployees,
    handleChangeEmployee,
    handleCrateEmployee,
    handleUpdateEmployee,
    views,
    pages,
    empPaginate,
    loadingEmployee,
  } = useDataContext();

  const { page, limit } = pages.employee;
  const end = Math.min(page * empPaginate?.limit, empPaginate?.totalItems);
  const total = listEmployee?.pagination?.totalItems;
  const start =
    listEmployee?.results?.length === 0 ? 0 : (page - 1) * limit + 1;
  if (views) return null;

  return (
    <div className="flex flex-col gap-2 m-2">
      {!formEmployees && (
        <React.Fragment>
          {/* Table */}
          <EmployeeTable setUpdate={setUpdate} setProfile={setProfile} />

          {/* Pagination */}
          <div className="flex justify-between items-center gap-4 mt-2">
            <p className="text-sm text-gray-600">
              Showing {start} - {end} of {total} list employees
            </p>

            <div className="md:mr-4">
              <Pagination
                module={"employee"}
                totalPages={empPaginate?.totalPages}
              />
            </div>
          </div>
        </React.Fragment>
      )}

      {formEmployees && (
        <FormEmployee
          key={employees?.employee_id || "new"} // ✅ important
          employees={employees}
          handleChangeEmployee={handleChangeEmployee}
          handleCrateEmployee={handleCrateEmployee}
          update={update}
          handleUpdateEmployee={handleUpdateEmployee}
          profile={profile}
          setProfile={setProfile}
          loadingEmployee={loadingEmployee}
        />
      )}
    </div>
  );
}

export { ListEmployees };
