import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

function About() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "30px 24px 80px",
        }}
      >
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/")}
          style={{ marginBottom: 40 }}
        >
          Back to Home
        </Button>

        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
          }}
        >
          <Text
            style={{
              color: "#1677ff",
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            ABOUT US
          </Text>

          <Title
            style={{
              fontSize: "clamp(35px, 5vw, 52px)",
              marginTop: 12,
            }}
          >
            Making IT Support Simple
          </Title>

          <Paragraph
            type="secondary"
            style={{
              maxWidth: 700,
              margin: "0 auto",
              fontSize: 17,
              lineHeight: 1.8,
            }}
          >
            Enterprise IT Helpdesk is designed to
            simplify the way organizations manage
            technical support requests and communicate
            with their IT teams.
          </Paragraph>
        </div>

        <Row gutter={[30, 30]}>
          <Col xs={24} md={8}>
            <Card
              style={{
                height: "100%",
                borderRadius: 16,
              }}
            >
              <ToolOutlined
                style={{
                  fontSize: 36,
                  color: "#1677ff",
                  marginBottom: 20,
                }}
              />

              <Title level={3}>
                Our Mission
              </Title>

              <Paragraph type="secondary">
                To make IT support organized, accessible,
                and efficient for every organization.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              style={{
                height: "100%",
                borderRadius: 16,
              }}
            >
              <TeamOutlined
                style={{
                  fontSize: 36,
                  color: "#1677ff",
                  marginBottom: 20,
                }}
              />

              <Title level={3}>
                Our Team
              </Title>

              <Paragraph type="secondary">
                We connect customers, support agents,
                and administrators through one
                centralized platform.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              style={{
                height: "100%",
                borderRadius: 16,
              }}
            >
              <CheckCircleOutlined
                style={{
                  fontSize: 36,
                  color: "#52c41a",
                  marginBottom: 20,
                }}
              />

              <Title level={3}>
                Our Goal
              </Title>

              <Paragraph type="secondary">
                To help organizations resolve technical
                problems faster while keeping every
                support request organized.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <Card
          style={{
            marginTop: 40,
            borderRadius: 18,
          }}
        >
          <Title level={2}>
            Why Enterprise IT Helpdesk?
          </Title>

          <Paragraph
            type="secondary"
            style={{
              fontSize: 16,
              lineHeight: 1.8,
            }}
          >
            Traditional IT support can become difficult
            when requests are scattered across emails,
            messages, and conversations. Our helpdesk
            brings everything into one structured system.
          </Paragraph>

          <Space
            direction="vertical"
            size="middle"
          >
            <Space>
              <CheckCircleOutlined
                style={{ color: "#52c41a" }}
              />
              <Text>
                Centralized ticket management
              </Text>
            </Space>

            <Space>
              <CheckCircleOutlined
                style={{ color: "#52c41a" }}
              />
              <Text>
                Clear ticket status tracking
              </Text>
            </Space>

            <Space>
              <CheckCircleOutlined
                style={{ color: "#52c41a" }}
              />
              <Text>
                Secure role-based access
              </Text>
            </Space>

            <Space>
              <CheckCircleOutlined
                style={{ color: "#52c41a" }}
              />
              <Text>
                Easy communication between users
                and support agents
              </Text>
            </Space>
          </Space>
        </Card>
      </div>
    </div>
  );
}

export default About;