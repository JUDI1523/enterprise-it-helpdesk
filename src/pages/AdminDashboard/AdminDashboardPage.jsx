import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Row,
  Space,
  Spin,
  Statistic,
  Typography,
} from "antd";

import {
  CheckCircleOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  RightOutlined,
  SettingOutlined,
  TagsOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getDashboardStats } from "../../api/dashboardApi";

const { Title, Text, Paragraph } = Typography;

function AdminDashboardPage() {
  const navigate = useNavigate();

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
          total_tickets: data.total_tickets || 0,
          open_tickets: data.open_tickets || 0,
          closed_tickets: data.closed_tickets || 0,
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

  return (
    <DashboardLayout>
      <div
        style={{
          marginBottom: 30,
        }}
      >
        <Title
          level={2}
          style={{
            marginBottom: 8,
          }}
        >
          Admin Dashboard
        </Title>

        <Text type="secondary">
          Monitor and manage the Enterprise IT Helpdesk
          from one central location.
        </Text>
      </div>

      {error && (
        <Alert
          message="Unable to load dashboard"
          description={error}
          type="error"
          showIcon
          style={{
            marginBottom: 24,
          }}
        />
      )}

      {loading ? (
        <div
          style={{
            minHeight: 350,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={[20, 20]}>
            <Col xs={24} sm={12} lg={8}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  borderRadius: 16,
                }}
              >
                <Statistic
                  title="Total Tickets"
                  value={stats.total_tickets}
                  prefix={
                    <FileTextOutlined />
                  }
                />

                <Text
                  type="secondary"
                  style={{
                    display: "block",
                    marginTop: 10,
                  }}
                >
                  All support requests
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  borderRadius: 16,
                }}
              >
                <Statistic
                  title="Open Tickets"
                  value={stats.open_tickets}
                  prefix={
                    <FolderOpenOutlined />
                  }
                />

                <Text
                  type="secondary"
                  style={{
                    display: "block",
                    marginTop: 10,
                  }}
                >
                  Tickets requiring attention
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  borderRadius: 16,
                }}
              >
                <Statistic
                  title="Closed Tickets"
                  value={stats.closed_tickets}
                  prefix={
                    <CheckCircleOutlined />
                  }
                />

                <Text
                  type="secondary"
                  style={{
                    display: "block",
                    marginTop: 10,
                  }}
                >
                  Successfully completed
                </Text>
              </Card>
            </Col>
          </Row>

          <Card
            style={{
              marginTop: 24,
              borderRadius: 16,
              background:
                "linear-gradient(135deg, #1677ff 0%, #0958d9 100%)",
              border: "none",
            }}
          >
            <Row
              align="middle"
              gutter={[24, 24]}
            >
              <Col xs={24} md={16}>
                <Title
                  level={3}
                  style={{
                    color: "#fff",
                    marginBottom: 8,
                  }}
                >
                  Helpdesk Administration
                </Title>

                <Paragraph
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    marginBottom: 0,
                    fontSize: 16,
                  }}
                >
                  Manage tickets, users, and support
                  categories from the administration
                  panel.
                </Paragraph>
              </Col>

              <Col
                xs={24}
                md={8}
                style={{
                  textAlign: "right",
                }}
              >
                <Button
                  size="large"
                  icon={<RightOutlined />}
                  onClick={() =>
                    navigate("/tickets")
                  }
                >
                  View Tickets
                </Button>
              </Col>
            </Row>
          </Card>

          <Title
            level={3}
            style={{
              marginTop: 32,
              marginBottom: 16,
            }}
          >
            Quick Management
          </Title>

          <Row gutter={[20, 20]}>
            <Col xs={24} md={8}>
              <Card
                hoverable
                onClick={() =>
                  navigate("/tickets")
                }
                style={{
                  borderRadius: 16,
                  cursor: "pointer",
                }}
              >
                <Space
                  direction="vertical"
                  size="middle"
                >
                  <FileTextOutlined
                    style={{
                      fontSize: 30,
                    }}
                  />

                  <Title
                    level={4}
                    style={{
                      margin: 0,
                    }}
                  >
                    Ticket Management
                  </Title>

                  <Text type="secondary">
                    View and manage all support tickets.
                  </Text>
                </Space>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card
                hoverable
                onClick={() =>
                  navigate("/users")
                }
                style={{
                  borderRadius: 16,
                  cursor: "pointer",
                }}
              >
                <Space
                  direction="vertical"
                  size="middle"
                >
                  <TeamOutlined
                    style={{
                      fontSize: 30,
                    }}
                  />

                  <Title
                    level={4}
                    style={{
                      margin: 0,
                    }}
                  >
                    User Management
                  </Title>

                  <Text type="secondary">
                    View the users currently available
                    in the system.
                  </Text>
                </Space>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card
                hoverable
                onClick={() =>
                  navigate("/categories")
                }
                style={{
                  borderRadius: 16,
                  cursor: "pointer",
                }}
              >
                <Space
                  direction="vertical"
                  size="middle"
                >
                  <TagsOutlined
                    style={{
                      fontSize: 30,
                    }}
                  />

                  <Title
                    level={4}
                    style={{
                      margin: 0,
                    }}
                  >
                    Category Management
                  </Title>

                  <Text type="secondary">
                    Create and manage support categories.
                  </Text>
                </Space>
              </Card>
            </Col>
          </Row>

          <Card
            style={{
              marginTop: 24,
              borderRadius: 16,
            }}
          >
            <Space align="start">
              <SettingOutlined
                style={{
                  fontSize: 24,
                }}
              />

              <div>
                <Title
                  level={4}
                  style={{
                    marginTop: 0,
                    marginBottom: 6,
                  }}
                >
                  Administration Center
                </Title>

                <Text type="secondary">
                  Use the quick management options above
                  to navigate through the helpdesk system.
                </Text>
              </div>
            </Space>
          </Card>
        </>
      )}
    </DashboardLayout>
  );
}

export default AdminDashboardPage;