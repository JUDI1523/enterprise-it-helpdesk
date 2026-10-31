import {
  ArrowLeftOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Space,
  Typography,
  Form,
  message,
} from "antd";

import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

function Contact() {
  const navigate = useNavigate();

  const [messageApi, contextHolder] =
    message.useMessage();

  const handleSubmit = () => {
    messageApi.success(
      "Thank you! Your message has been received."
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "30px 24px 80px",
      }}
    >
      {contextHolder}

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
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
            marginBottom: 50,
          }}
        >
          <Text
            style={{
              color: "#1677ff",
              fontWeight: 600,
            }}
          >
            CONTACT US
          </Text>

          <Title
            style={{
              fontSize: "clamp(35px, 5vw, 52px)",
              marginTop: 12,
            }}
          >
            We're Here to Help
          </Title>

          <Paragraph
            type="secondary"
            style={{
              fontSize: 17,
            }}
          >
            Have a question or need assistance?
            Get in touch with our team.
          </Paragraph>
        </div>

        <Row gutter={[30, 30]}>
          <Col xs={24} md={10}>
            <Card
              style={{
                height: "100%",
                borderRadius: 16,
              }}
            >
              <Title level={3}>
                Contact Information
              </Title>

              <Space
                direction="vertical"
                size="large"
                style={{
                  marginTop: 25,
                }}
              >
                <Space align="start">
                  <EnvironmentOutlined
                    style={{
                      fontSize: 24,
                      color: "#1677ff",
                    }}
                  />

                  <div>
                    <Text strong>
                      Address
                    </Text>

                    <br />

                    <Text type="secondary">
                      Bahir Dar, Ethiopia
                    </Text>
                  </div>
                </Space>

                <Space align="start">
                  <MailOutlined
                    style={{
                      fontSize: 24,
                      color: "#1677ff",
                    }}
                  />

                  <div>
                    <Text strong>
                      Email
                    </Text>

                    <br />

                    <Text type="secondary">
                      support@enterprisehelpdesk.com
                    </Text>
                  </div>
                </Space>

                <Space align="start">
                  <PhoneOutlined
                    style={{
                      fontSize: 24,
                      color: "#1677ff",
                    }}
                  />

                  <div>
                    <Text strong>
                      Phone
                    </Text>

                    <br />

                    <Text type="secondary">
                      +251 900 000 000
                    </Text>
                  </div>
                </Space>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={14}>
            <Card
              style={{
                borderRadius: 16,
              }}
            >
              <Title level={3}>
                Send Us a Message
              </Title>

              <Form
                layout="vertical"
                onFinish={handleSubmit}
                style={{ marginTop: 25 }}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message:
                        "Please enter your name.",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Your name"
                  />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message:
                        "Please enter your email.",
                    },
                    {
                      type: "email",
                      message:
                        "Please enter a valid email.",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="you@example.com"
                  />
                </Form.Item>

                <Form.Item
                  label="Message"
                  name="message"
                  rules={[
                    {
                      required: true,
                      message:
                        "Please enter your message.",
                    },
                  ]}
                >
                  <TextArea
                    rows={6}
                    placeholder="How can we help you?"
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                >
                  Send Message
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Contact;