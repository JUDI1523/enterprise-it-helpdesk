import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SafetyOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const features = [
  {
    icon: <CheckCircleOutlined />,
    title: "Ticket Management",
    description:
      "Create, organize, and manage IT support tickets from one centralized platform.",
    details:
      "Customers can submit technical issues while support agents can review, manage, and respond to tickets. Every ticket contains important information such as title, description, category, priority, status, customer, and replies.",
  },
  {
    icon: <ThunderboltOutlined />,
    title: "Faster Resolution",
    description:
      "Help support teams respond quickly and resolve technical problems efficiently.",
    details:
      "Agents can immediately view ticket details, communicate with customers, update ticket statuses, and track the progress of every support request.",
  },
  {
    icon: <SafetyOutlined />,
    title: "Secure Access",
    description:
      "Protect your helpdesk with role-based access for customers, agents, and administrators.",
    details:
      "Each user receives access based on their role. Customers manage their own support requests, agents handle support tickets, and administrators manage the overall system.",
  },
  {
    icon: <ClockCircleOutlined />,
    title: "Ticket Tracking",
    description:
      "Track every support request from creation to resolution.",
    details:
      "Tickets can move through different stages including Open, In Progress, Resolved, and Closed. This makes it easy for support teams and customers to understand the current state of an issue.",
  },
  {
    icon: <TeamOutlined />,
    title: "Team Collaboration",
    description:
      "Connect customers and support teams through organized ticket communication.",
    details:
      "Ticket replies allow customers and support agents to communicate within the same support request, keeping conversations and technical information together.",
  },
  {
    icon: <ToolOutlined />,
    title: "Centralized Support",
    description:
      "Keep tickets, categories, users, and support communication organized in one system.",
    details:
      "The helpdesk provides a centralized environment where administrators can manage users and categories while agents and customers can focus on their support activities.",
  },
];

function Features() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f0f7ff 0%, #ffffff 45%, #eef4ff 100%)",
      }}
    >
      <header
        style={{
          padding: "22px 24px",
          background: "rgba(255,255,255,0.9)",
          borderBottom: "1px solid #e8e8e8",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/")}
            style={{
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Back to Home
          </Button>
        </div>
      </header>

      <section
        style={{
          padding: "90px 24px 70px",
          textAlign: "center",
        }}
      >
        <Tag
          color="blue"
          style={{
            padding: "7px 16px",
            borderRadius: 20,
            fontSize: 14,
          }}
        >
          POWERFUL HELP DESK FEATURES
        </Tag>

        <Title
          style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            marginTop: 22,
            marginBottom: 20,
            fontWeight: 700,
          }}
        >
          Everything Your IT Team Needs
        </Title>

        <Paragraph
          style={{
            maxWidth: 760,
            margin: "0 auto",
            fontSize: 18,
            color: "#667085",
          }}
        >
          A modern IT support platform designed to help
          customers, support agents, and administrators
          manage technical issues faster and more efficiently.
        </Paragraph>

        <Button
          type="primary"
          size="large"
          icon={<ArrowRightOutlined />}
          onClick={() => navigate("/login")}
          style={{
            marginTop: 25,
            height: 48,
            padding: "0 28px",
          }}
        >
          Get Started
        </Button>
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "20px 24px 90px",
        }}
      >
        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={8} key={feature.title}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  minHeight: 300,
                  borderRadius: 18,
                  border: "1px solid #e6edf7",
                  overflow: "hidden",
                }}
                styles={{
                  body: {
                    padding: 30,
                  },
                }}
              >
                <div
                  style={{
                    width: 62,
                    height: 62,
                    borderRadius: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "linear-gradient(135deg, #1677ff, #69b1ff)",
                    color: "#fff",
                    fontSize: 30,
                    marginBottom: 22,
                  }}
                >
                  {feature.icon}
                </div>

                <Text
                  type="secondary"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  FEATURE 0{index + 1}
                </Text>

                <Title
                  level={3}
                  style={{
                    marginTop: 8,
                    marginBottom: 12,
                  }}
                >
                  {feature.title}
                </Title>

                <Paragraph
                  style={{
                    color: "#667085",
                    marginBottom: 18,
                  }}
                >
                  {feature.description}
                </Paragraph>

                <Paragraph
                  style={{
                    color: "#475467",
                    lineHeight: 1.7,
                  }}
                >
                  {feature.details}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <Divider style={{ margin: 0 }} />

      <section
        style={{
          padding: "80px 24px",
          textAlign: "center",
          background: "#ffffff",
        }}
      >
        <Space
          direction="vertical"
          size="middle"
          style={{
            maxWidth: 700,
          }}
        >
          <Title level={2}>
            Ready to Simplify IT Support?
          </Title>

          <Paragraph
            style={{
              fontSize: 17,
              color: "#667085",
            }}
          >
            Give your team a centralized platform for managing
            support requests, communicating with customers,
            and resolving technical issues.
          </Paragraph>

          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            onClick={() => navigate("/login")}
          >
            Access Helpdesk
          </Button>
        </Space>
      </section>

      <footer
        style={{
          padding: "30px 24px",
          textAlign: "center",
          background: "#101828",
        }}
      >
        <Text style={{ color: "#98a2b3" }}>
          © 2026 Enterprise IT Helpdesk. All rights reserved.
        </Text>
      </footer>
    </div>
  );
}

export default Features;

