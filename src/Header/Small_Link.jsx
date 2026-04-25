import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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

function Small_Link() {
  const {
    setLoadLink,
    setFormEmployees,
    setEmployees,
    setViews,
    auth,
    setNewStudent,
    setShowHidden,
    showHidden,
    logout,
  } = useDataContext();
  const [active, setActive] = useState(1);
  const [activeSetting, setActiveSetting] = useState("");
  const [bgSetting, setBgSetting] = useState("");

  const location = useLocation();
  useEffect(() => {
    const current = navLinks?.find((item) =>
      location.pathname.startsWith(item.path),
    );
    if (current) {
      setActive(current?.id);
      setLoadLink(current.name);
    }
  }, [location.pathname]);
  const roles = auth?.role?.toLowerCase();
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
    <React.Fragment>
      <div
        className={`rounded fixed top-0 right-0 w-[20rem] h-full pl-2 bg-gray-50 transition-all duration-500 transform 
            ${showHidden ? "flex flex-col z-80 translate-x-0 opacity-100" : "opacity-0 -z-10 translate-x-1/2"} `}
      >
        <div
          onClick={() => {
            setShowHidden(false);
          }}
          className="relative top-6 left-0 w-8 h-8 cursor-pointer transform -translate-y-1/2 group"
        >
          <div className="absolute top-1/2 w-full h-[3px] bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 origin-center transition-all duration-200 ease-in-out transform rotate-45 group-hover:rotate-0"></div>
          <div className="absolute top-1/2 w-full h-[3px] bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 origin-center transition-all duration-200 ease-in-out transform -rotate-45 group-hover:rotate-0"></div>
        </div>
        <ul className="flex flex-col gap-1 text-sm mt-8 w-full">
          {navLinks
            .filter((link) => link?.roles?.includes(roles))
            .map((item) => {
              const isActive = active === item.id;

              return (
                <li key={item?.id}>
                  <Link
                    to={item?.path}
                    className={`
                flex items-center gap-2 px-4 py-2 rounded-l-md
                transition-all duration-200 text-[15px]
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 via-blue-600  to-blue-600 text-white shadow font-semibold"
                    : "text-black hover:bg-blue-200 hover:text-blue-600"
                }
              `}
                    onClick={() => {
                      setActive(item?.id);
                      setFormEmployees(false);
                      setEmployees(null);
                      setViews(false);
                      setNewStudent(false);
                      setLoadLink(item?.name);
                      setShowHidden(false);
                    }}
                  >
                    <i className={`${item.icon}`}></i>
                    <h2>{item.name}</h2>
                  </Link>
                </li>
              );
            })}
          {/* Setting Menu */}
          <li>
            <NavLink
              to="/account"
              onClick={() => {
                setBgSetting("Setting");
                setActive(0);
              }}
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
                    onClick={() => {
                      setActiveSetting(item.name);
                      setShowHidden(false);
                    }}
                  >
                    <h2>{item.name}</h2>
                  </NavLink>
                </li>
              ))}

          <li>
            <NavLink
              to="/"
              onClick={() => {
                logout();
                setShowHidden(false);
              }}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-l-md text-[15px] transition-all duration-200
             bg-red-500 text-white font-bold cursor-pointer`
              }
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span>Log out</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}

export default Small_Link;
