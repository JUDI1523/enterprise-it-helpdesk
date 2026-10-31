import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { Spin } from "antd";

import useAuthStore from "../store/authStore";

function ProtectedRoute() {
  const currentUser = useAuthStore(
    (state) => state.currentUser
  );

  const loading = useAuthStore(
    (state) => state.loading
  );

  // Wait until we finish checking
  // the saved authentication token.
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  // Authentication check is finished.
  // If there is still no user, go to login.
  if (!currentUser) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;

