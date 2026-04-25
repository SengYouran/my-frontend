import Login from "./Login/Login";
import RootLayer from "./Root/RootLayer";
import RootLink from "./Root/RootLink";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Dashboard,
  Academics,
  Employees,
  Students,
  Teachers,
  Finance,
  Reports,
  Settings,
} from "./Pages";
import DetailEmployee from "./Employees/DetailEmployee";
import Class from "./Pages/Class";
import Expenses_list from "./Accounting/Expenses_list";
import Detail_Student from "./Students/Detail_Student";
import AccountSetting from "./Setting/AccountSetting";
import Info_School from "./Setting/Info_School";
import Courses from "./Setting/Courses";
import Payment_Setting from "./Setting/Payment_Setting";
import Expenses_Categories from "./Setting/Expenses_Categories";
import Users from "./Setting/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayer />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        element: <RootLink />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "academics", element: <Academics /> },
          {
            path: "employees",
            element: <Employees />,
            children: [{ path: "detail/:id", element: <DetailEmployee /> }],
          },
          {
            path: "students",
            element: <Students />,
            children: [{ path: "detail/:id", element: <Detail_Student /> }],
          },
          { path: "classs", element: <Class /> },
          { path: "teachers", element: <Teachers /> },
          { path: "finance", element: <Finance /> },
          { path: "expenses", element: <Expenses_list /> },
          { path: "reports", element: <Reports /> },
          {
            element: <Settings />,
            children: [
              { index: true, element: <AccountSetting /> }, // default
              { path: "account", element: <AccountSetting /> },
              { path: "school", element: <Info_School /> },
              { path: "courses", element: <Courses /> },
              { path: "payment", element: <Payment_Setting /> },
              { path: "expense-categories", element: <Expenses_Categories /> },
              { path: "users", element: <Users /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
