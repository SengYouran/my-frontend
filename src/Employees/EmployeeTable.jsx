import { useNavigate } from "react-router-dom";
import { useDataContext } from "../Context";
import SkeletonTableEmployee from "./SkeletonTableEmployee";

function EmployeeTable({ setUpdate, setProfile }) {
  const navigate = useNavigate();

  const {
    listEmployee,
    loadingEmployee,
    setViews,
    setEmployees,
    setFormEmployees,
    handleDeleteEmployee,
  } = useDataContext();

  function DetailEmployee(id) {
    navigate(`/employees/detail/${id}`);
  }

  if (loadingEmployee) {
    return <SkeletonTableEmployee />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 text-xs md:text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-1.5 px-2 md:p-2 text-left border-l-2">Name</th>
            <th className="py-1.5 px-2 md:p-2 text-left hidden xl:table-cell">
              Email
            </th>
            <th className="py-1.5 px-2 md:p-2 text-left">Position</th>
            <th className="py-1.5 px-2 md:p-2 text-left hidden md:table-cell">
              Salary
            </th>
            <th className="py-1.5 px-2 md:p-2 text-left hidden md:table-cell">
              Telephone
            </th>
            <th className="py-1.5 px-2 md:p-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {listEmployee?.results?.map((emp, index) => (
            <tr
              key={emp.id}
              className={`${
                index % 2 === 0
                  ? "bg-white"
                  : "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-100"
              }`}
            >
              <td className="py-1.5 px-2 md:p-2 border-l-2 overflow-hidden text-ellipsis whitespace-nowrap">
                {emp?.last_name} {emp?.first_name}
              </td>

              <td className="py-1.5 px-2 md:p-2 overflow-hidden text-ellipsis whitespace-nowrap hidden xl:table-cell">
                {emp?.email}
              </td>

              <td className="py-1.5 px-2 md:p-2 overflow-hidden text-ellipsis whitespace-nowrap">
                {emp?.roles}
              </td>

              <td className="py-1.5 px-2 md:p-2 overflow-hidden text-ellipsis whitespace-nowrap hidden md:table-cell">
                ${emp?.salary}
              </td>

              <td className="py-1.5 px-2 md:p-2 overflow-hidden text-ellipsis whitespace-nowrap hidden md:table-cell">
                {emp?.telephone}
              </td>

              <td className="py-1.5 px-2 md:p-2">
                <div className="flex flex-wrap items-center gap-1">
                  <button
                    className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-sm font-medium bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                      DetailEmployee(emp?.id);
                      setViews(true);
                    }}
                  >
                    View
                  </button>

                  <button
                    className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-sm font-medium bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => {
                      const empToEdit = {
                        ...emp,
                        dob: emp?.dob
                          ? new Date(emp.dob).toISOString().slice(0, 10)
                          : "",
                        hire_date: emp?.hire_date
                          ? new Date(emp.hire_date).toISOString().slice(0, 10)
                          : "",
                      };

                      setEmployees(empToEdit);
                      setFormEmployees(true);
                      setUpdate(false); 
                      setProfile(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-sm font-medium bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => {
                      handleDeleteEmployee(emp?.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
