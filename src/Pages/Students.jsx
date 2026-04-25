import { Outlet } from "react-router-dom";
import Student_list from "../Students/Student_list";

function Students() {
  return (
    <div className="bg-white p-2 rounded md:mr-4">
      <Student_list />
      <Outlet />
    </div>
  );
}

export default Students;
