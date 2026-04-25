import { Outlet } from "react-router-dom";

function Settings() {
  return (
    <div className="bg-white p-2 rounded md:mr-4">
      <Outlet />
    </div>
  );
}

export default Settings;
