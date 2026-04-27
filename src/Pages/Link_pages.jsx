import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDataContext } from "../Context";

const navLinks = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    roles: ["admin", "teacher", "accounting"],
    icon: "fa-solid fa-chart-simple",
  },
  {
    id: 2,
    name: "Employee",
    path: "/employees",
    roles: ["admin"],
    icon: "fa-solid fa-user-tie",
  },
  {
    id: 3,
    name: "Teacher",
    path: "/teachers",
    roles: ["admin"],
    icon: "fa-solid fa-chalkboard-user",
  },
  {
    id: 7,
    name: "Student",
    path: "/students",
    roles: ["admin", "teacher"],
    icon: "fa-solid fa-graduation-cap",
  },
  {
    id: 4,
    name: "Finance",
    path: "/finance",
    roles: ["admin", "accounting"],
    icon: "fa-solid fa-money-check-dollar",
  },
  {
    id: 8,
    name: "Expense",
    path: "/expenses",
    roles: ["admin", "accounting"],
    icon: "fa-solid fa-hand-holding-dollar",
  },
  {
    id: 5,
    name: "Report",
    path: "/reports",
    roles: ["admin", "teacher", "accounting"],
    icon: "fa-solid fa-file-lines",
  },
];

const settingLinks = [
  {
    name: "Account",
    path: "/account",
    roles: ["admin", "teacher", "accounting"],
  },
  { name: "School Info", path: "/school", roles: ["admin"] },
  { name: "Courses", path: "/courses", roles: ["admin"] },
  {
    name: "Payment Settings",
    path: "/payment",
    roles: ["admin", "accounting"],
  },
  {
    name: "Expense Categories",
    path: "/expense-categories",
    roles: ["admin", "accounting"],
  },
  { name: "Users", path: "/users", roles: ["admin"] },
];

function Link_Pages({
  setShowHidden,
  setFormEmployees,
  setEmployees,
  setViews,
  setNewStudent,
  auth,
}) {
  const { setLoadLink } = useDataContext();
  const location = useLocation();
  const roles = auth?.role?.toLowerCase() || "";
  const [activeSetting, setActiveSetting] = useState("");
  const [bgSetting, setBgSetting] = useState("");

  // Reset helper
  const resetStates = () => {
    setShowHidden(false);
    setFormEmployees(false);
    setEmployees(null);
    setViews(false);
    setNewStudent(false);
  };

  // Sync submenu Setting based on URL
  useEffect(() => {
    const currentSetting = settingLinks.find((item) =>
      location.pathname.startsWith(item.path),
    );
    if (currentSetting) {
      setActiveSetting(currentSetting.name);
      setBgSetting("Setting");
      setLoadLink("Setting");
    } else {
      setBgSetting("");
      setActiveSetting("");
    }
  }, [location.pathname, setLoadLink]);

  return (
    <ul className="flex flex-col gap-1 text-sm overflow-y-auto max-h-[70vh] hiddenScroll">
      {/* Main Navigation */}
      {navLinks
        .filter((link) => link.roles.includes(roles))
        .map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.path}
              onClick={() => {
                resetStates();
                setLoadLink(item.name);
              }}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-l-md text-[15px] transition-all duration-200
               ${
                 isActive
                   ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-600 text-white shadow font-semibold"
                   : "text-black hover:bg-blue-200 hover:text-blue-600"
               }`
              }
            >
              <i className={item.icon}></i>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}

      {/* Setting Menu */}
      <li>
        <NavLink
          to="/account"
          onClick={() => setBgSetting("Setting")}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-l-md text-[15px] transition-all duration-200
             ${
               bgSetting === "Setting"
                 ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-600 text-white shadow font-semibold"
                 : "text-black hover:bg-blue-200 hover:text-blue-600"
             }`
          }
        >
          <i className="fa-solid fa-gear"></i>
          <span>Setting</span>
        </NavLink>
      </li>

      {/* Setting Submenu */}
      {bgSetting === "Setting" &&
        settingLinks
          .filter((item) => item.roles.includes(roles))
          .map((item) => (
            <li
              key={item.name}
              className={`ml-6 pl-3 py-1.5 rounded-r-md border-l-4 transition-all duration-200
               ${
                 activeSetting === item.name
                   ? "border-blue-600 bg-blue-50 text-blue-600 font-medium"
                   : "border-transparent text-gray-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
               }`}
            >
              <NavLink
                to={item.path}
                onClick={() => setActiveSetting(item.name)}
              >
                <h2>{item.name}</h2>
              </NavLink>
            </li>
          ))}
    </ul>
  );
}

export default Link_Pages;
