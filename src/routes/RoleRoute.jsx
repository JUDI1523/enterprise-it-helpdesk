import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

function RoleRoute({ allowedRoles }) {
  const currentUser = useAuthStore((state) => state.currentUser);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default RoleRoute;