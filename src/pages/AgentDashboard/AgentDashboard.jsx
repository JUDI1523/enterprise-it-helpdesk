import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Empty,
  Row,
  Spin,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd";

import {
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import useAuthStore from "../../store/authStore";
import useTranslation from "../../hooks/useTranslation";

import { getDashboardStats } from "../../api/dashboardApi";
import { getTickets } from "../../api/ticketApi";

const { Title, Text } = Typography;

function AgentDashboard() {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const currentUser = useAuthStore(
    (state) => state.currentUser
  );

  const [stats, setStats] = useState({
    total_tickets: 0,
    open_tickets: 0,
    closed_tickets: 0,
  });

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [statsData, ticketsData] =
          await Promise.all([
            getDashboardStats(),
            getTickets(),
          ]);

        setStats({
          total_tickets:
            statsData?.total_tickets ?? 0,
          open_tickets:
            statsData?.open_tickets ?? 0,
          closed_tickets:
            statsData?.closed_tickets ?? 0,
        });

        setTickets(
          Array.isArray(ticketsData)
            ? ticketsData
            : []
        );
      } catch (error) {
        console.error(
          "Failed to load agent dashboard:",
          error
        );

        setError(
          error.message ||
            "Failed to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const getStatusColor = (status) => {
    if (status === "Open") return "blue";
    if (status === "In Progress") return "orange";
    if (status === "Resolved") return "green";
    if (status === "Closed") return "default";

    return "default";
  };

  const getStatusText = (status) => {
    if (status === "Open") {
      return t.tickets.open;
    }

    if (status === "In Progress") {
      return t.tickets.inProgress;
    }

    if (status === "Resolved") {
      return t.tickets.resolved;
    }

    if (status === "Closed") {
      return t.tickets.closed;
    }

    return status;
  };

  const getPriorityColor = (priority) => {
    if (priority === "High") return "red";
    if (priority === "Medium") return "orange";
    if (priority === "Low") return "green";

    return "default";
  };

  const getPriorityText = (priority) => {
    if (priority === "High") {
      return t.tickets.high;
    }

    if (priority === "Medium") {
      return t.tickets.medium;
    }

    if (priority === "Low") {
      return t.tickets.low;
    }

    return priority;
  };

  const recentTickets = [...tickets]
    .sort(
      (a, b) =>
        new Date(b.created_at) -
        new Date(a.created_at)
    )
    .slice(0, 5);

  const columns = [
    {
      title: t.tickets.id,
      dataIndex: "id",
      key: "id",
      width: 70,
    },

    {
      title: t.tickets.ticketTitle,
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },

    {
      title: t.tickets.category,
      key: "category",
      render: (_, ticket) =>
        ticket.category?.name ||
        ticket.category ||
        "N/A",
    },

    {
      title: t.tickets.priority,
      dataIndex: "priority",
      key: "priority",

      render: (priority) => (
        <Tag color={getPriorityColor(priority)}>
          {getPriorityText(priority)}
        </Tag>
      ),
    },

    {
      title: t.tickets.status,
      dataIndex: "status",
      key: "status",

      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },

    {
      title: t.tickets.createdBy,
      key: "customer",

      render: (_, ticket) =>
        ticket.user?.name ||
        ticket.author?.name ||
        ticket.created_by ||
        "Unknown",
    },

    {
      title: t.tickets.action,
      key: "action",

      render: (_, ticket) => (
        <Button
          type="link"
          icon={<ArrowRightOutlined />}
          onClick={() =>
            navigate(`/tickets/${ticket.id}`)
          }
        >
          {t.common.view}
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div
          style={{
            minHeight: 400,
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
      <Row
        justify="space-between"
        align="middle"
        gutter={[16, 16]}
      >
        <Col>
          <Title
            level={2}
            style={{ margin: 0 }}
          >
            {t.dashboard.agent.title}
          </Title>

          <Text type="secondary">
            {t.dashboard.agent.welcome}{" "}
            {currentUser?.name || "Agent"}.{" "}
            {t.dashboard.agent.overview}
          </Text>
        </Col>

        <Col>
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            onClick={() => navigate("/tickets")}
          >
            {t.dashboard.agent.viewAll}
          </Button>
        </Col>
      </Row>

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
        gutter={[20, 20]}
        style={{
          marginTop: 28,
        }}
      >
        <Col xs={24} sm={12} lg={8}>
          <Card
            hoverable
            style={{
              borderRadius: 12,
            }}
          >
            <Statistic
              title={t.dashboard.agent.totalTickets}
              value={stats.total_tickets}
              prefix={<FileTextOutlined />}
            />

            <Text
              type="secondary"
              style={{
                display: "block",
                marginTop: 8,
              }}
            >
              {t.dashboard.agent.totalTickets}
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            hoverable
            style={{
              borderRadius: 12,
            }}
          >
            <Statistic
              title={t.dashboard.agent.openTickets}
              value={stats.open_tickets}
              prefix={<ClockCircleOutlined />}
            />

            <Text
              type="secondary"
              style={{
                display: "block",
                marginTop: 8,
              }}
            >
              {t.tickets.open}
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            hoverable
            style={{
              borderRadius: 12,
            }}
          >
            <Statistic
              title={t.dashboard.agent.closedTickets}
              value={stats.closed_tickets}
              prefix={<CheckCircleOutlined />}
            />

            <Text
              type="secondary"
              style={{
                display: "block",
                marginTop: 8,
              }}
            >
              {t.tickets.closed}
            </Text>
          </Card>
        </Col>
      </Row>

      <Card
        title={t.dashboard.agent.recentTickets}
        style={{
          marginTop: 28,
          borderRadius: 12,
        }}
        extra={
          <Button
            type="link"
            onClick={() => navigate("/tickets")}
          >
            {t.dashboard.agent.viewAll}
          </Button>
        }
      >
        {recentTickets.length === 0 ? (
          <Empty
            description={
              t.dashboard.agent.noTickets
            }
          />
        ) : (
          <Table
            rowKey="id"
            columns={columns}
            dataSource={recentTickets}
            pagination={false}
            scroll={{ x: 900 }}
          />
        )}
      </Card>
    </DashboardLayout>
  );
}

export default AgentDashboard;

