import { Navigate, Outlet } from "react-router-dom";
import { useDataContext } from "../Context";
import DashboardSkeleton from "./DashboardSkeleton";

function ProtectedRoute() {
  const { auth, loading } = useDataContext();
  if (loading) {
    return (
      <div>
        <DashboardSkeleton />
      </div>
    );
  }
  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
