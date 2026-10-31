import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login/Login";
import Unauthorized from "../pages/Login/Unauthorized";

import CustomerDashboard from "../pages/CustomerDashboard/CustomerDashboard";
import AgentDashboard from "../pages/AgentDashboard/AgentDashboard";
import AdminDashboardPage from "../pages/AdminDashboard/AdminDashboardPage";

import TicketList from "../pages/TicketList/TicketList";
import CreateTicket from "../pages/CreateTicket/CreateTicket";
import TicketDetails from "../pages/TicketDetails/TicketDetails";

import UserManagement from "../pages/UserManagement/UserManagement";
import CategoryManagement from "../pages/CategoryManagement/CategoryManagement";
import Home from "../pages/Home/Home";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import About from "../pages/About/About";
import Features from "../pages/Features/Features";
import Contact from "../pages/Contact/Contact";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
<Route path="/register" element={<Register />} />

        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <RoleRoute allowedRoles={["customer"]} />
            }
          >
            <Route
              path="/customer/dashboard"
              element={<CustomerDashboard />}
            />

            <Route
              path="/tickets/create"
              element={<CreateTicket />}
            />
          </Route>

          <Route
            element={
              <RoleRoute allowedRoles={["agent"]} />
            }
          >
            <Route
              path="/agent/dashboard"
              element={<AgentDashboard />}
            />
          </Route>

          <Route
            element={
              <RoleRoute allowedRoles={["admin"]} />
            }
          >
            <Route
              path="/admin/dashboard"
              element={<AdminDashboardPage />}
            />

            <Route
              path="/users"
              element={<UserManagement />}
            />

            <Route
              path="/categories"
              element={<CategoryManagement />}
            />
          </Route>

          <Route
            path="/tickets"
            element={<TicketList />}
          />

          <Route
            path="/tickets/:id"
            element={<TicketDetails />}
          />
        </Route>

       <Route
  path="/"
  element={<Home />}
/>
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
        <Route
  path="/"
  element={<Home />}
/>

<Route
  path="/features"
  element={<Features />}
/>

<Route
  path="/about"
  element={<About />}
/>

<Route
  path="/contact"
  element={<Contact />}
/>
<Route
  path="/profile"
  element={<Profile />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;