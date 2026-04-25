import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../Context";
import Overview from "../Admin/Overview";
import DashboardSkeleton from "../Admin/DashboardSkeleton";
import Dashboard_Teacher from "../Dashboard_Teacher/Dashboard_Teacher";
import Dashboard_Accounting from "../Dashboard_Accounting/Dashboard_Accounting";
function Dashboard() {
  const { auth, loadingDashboard } = useDataContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loadingDashboard && !auth) {
      navigate("/", { replace: true });
    }
  }, [auth, loadingDashboard, navigate]);

  if (loadingDashboard) {
    return <DashboardSkeleton />;
  }

  const renderDashboard = () => {
    switch (auth?.role) {
      case "Admin":
        return <Overview />;

      case "Teacher":
        return <Dashboard_Teacher />;

      case "Accounting":
        return <Dashboard_Accounting />;

      default:
        return null;
    }
  };

  return (
    <div className="mt-4 bg-white p-2 rounded md:mr-4">{renderDashboard()}</div>
  );
}
export default Dashboard;
