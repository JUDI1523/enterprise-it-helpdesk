import { useEffect, useState } from "react";
import {
  Alert,
  Card,
  Col,
  Row,
  Spin,
  Statistic,
  Typography,
  Button,
} from "antd";

import {
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import useAuthStore from "../../store/authStore";
import useLanguageStore from "../../store/languageStore";
import { getDashboardStats } from "../../api/dashboardApi";
import en from "../../locales/en";
import am from "../../locales/am";

const { Title, Text } = Typography;

function CustomerDashboard() {
  const navigate = useNavigate();

  const currentUser = useAuthStore(
    (state) => state.currentUser
  );

  const language = useLanguageStore(
    (state) => state.language
  );

  const t = language === "am" ? am : en;

  const [stats, setStats] = useState({
    total_tickets: 0,
    open_tickets: 0,
    closed_tickets: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getDashboardStats();

        setStats({
          total_tickets:
            data?.total_tickets ?? 0,
          open_tickets:
            data?.open_tickets ?? 0,
          closed_tickets:
            data?.closed_tickets ?? 0,
        });
      } catch (error) {
        console.error(
          "Failed to load dashboard statistics:",
          error
        );

        setError(
          error.message ||
            "Failed to load dashboard statistics."
        );
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div
          style={{
            minHeight: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <Title
            level={2}
            style={{ marginBottom: 8 }}
          >
            {t.dashboard.customer.title}
          </Title>

          <Text type="secondary">
            {t.dashboard.customer.welcome}{" "}
            {currentUser?.name || "Customer"}!
          </Text>
        </div>

        <Button
          icon={<HomeOutlined />}
          onClick={() => navigate("/")}
        >
          {t.common.backToHome}
        </Button>
      </div>

      {error && (
        <Alert
          message="Unable to load dashboard"
          description={error}
          type="error"
          showIcon
          style={{
            marginTop: 24,
          }}
        />
      )}

      <Row
        gutter={[16, 16]}
        style={{
          marginTop: 24,
        }}
      >
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title={t.dashboard.customer.tickets}
              value={stats.total_tickets}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title={t.dashboard.customer.openTickets}
              value={stats.open_tickets}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title={t.dashboard.customer.closedTickets}
              value={stats.closed_tickets}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}

export default CustomerDashboard;

