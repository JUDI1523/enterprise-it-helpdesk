import { Layout, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const { Sider, Content } = Layout;

function DashboardLayout({ children }) {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={240}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Helpdesk
        </div>

        <Sidebar />
      </Sider>

      <Layout>
        <Header />

        <Content
          style={{
            margin: 24,
            padding: 24,
            minHeight: 280,
            background: "var(--content-background)",
            borderRadius: 8,
          }}
        >
          <Button
            icon={<HomeOutlined />}
            onClick={() => navigate("/")}
            style={{
              marginBottom: 20,
            }}
          >
            Back to Home
          </Button>

          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;