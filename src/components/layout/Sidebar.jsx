import {
  DashboardOutlined,
  FileTextOutlined,
  PlusCircleOutlined,
  UserOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";
import useLanguageStore from "../../store/languageStore";
import en from "../../locales/en";
import am from "../../locales/am";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = useAuthStore(
    (state) => state.currentUser
  );

  const language = useLanguageStore(
    (state) => state.language
  );

  const t = language === "am" ? am : en;

  const role = currentUser?.role;

  const customerItems = [
    {
      key: "/customer/dashboard",
      icon: <DashboardOutlined />,
      label: t.sidebar.dashboard,
    },
    {
      key: "/tickets",
      icon: <FileTextOutlined />,
      label: t.sidebar.myTickets,
    },
    {
      key: "/tickets/create",
      icon: <PlusCircleOutlined />,
      label: t.sidebar.createTicket,
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: t.sidebar.profile,
    },
  ];

  const agentItems = [
    {
      key: "/agent/dashboard",
      icon: <DashboardOutlined />,
      label: t.sidebar.dashboard,
    },
    {
      key: "/tickets",
      icon: <FileTextOutlined />,
      label: t.sidebar.allTickets,
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: t.sidebar.profile,
    },
  ];

  const adminItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: t.sidebar.dashboard,
    },
    {
      key: "/tickets",
      icon: <FileTextOutlined />,
      label: t.sidebar.allTickets,
    },
    {
      key: "/users",
      icon: <UserOutlined />,
      label: t.sidebar.userManagement,
    },
    {
      key: "/categories",
      icon: <AppstoreOutlined />,
      label: t.sidebar.categoryManagement,
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: t.sidebar.profile,
    },
  ];

  let menuItems = [];

  if (role === "customer") {
    menuItems = customerItems;
  }

  if (role === "agent") {
    menuItems = agentItems;
  }

  if (role === "admin") {
    menuItems = adminItems;
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      items={menuItems}
      onClick={({ key }) => navigate(key)}
    />
  );
}

export default Sidebar;

