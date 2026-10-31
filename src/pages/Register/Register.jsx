import {
  Button,
  Card,
  Form,
  Input,
  Typography,
  message,
} from "antd";
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  ArrowLeftOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";

const { Title, Text, Paragraph } = Typography;

function Register() {
  const navigate = useNavigate();

  const register = useAuthStore(
    (state) => state.register
  );

  const loading = useAuthStore(
    (state) => state.loading
  );

  const [messageApi, contextHolder] =
    message.useMessage();

 const handleRegister = async (values) => {
  const result = await register(
    values.name,
    values.email,
    values.password,
    values.password_confirmation
  );

  if (!result.success) {
    messageApi.error(result.error);
    return;
  }

  messageApi.success("Account created successfully!");

  navigate("/customer/dashboard", {
    replace: true,
  });
};

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        background:
          "linear-gradient(135deg, #eaf4ff 0%, #ffffff 50%, #eef6ff 100%)",
      }}
    >
      {contextHolder}

      <Card
        style={{
          width: "100%",
          maxWidth: 480,
          borderRadius: 20,
          boxShadow:
            "0 20px 50px rgba(0, 0, 0, 0.08)",
          border: "1px solid #e6edf7",
        }}
        styles={{
          body: {
            padding: "40px 36px",
          },
        }}
      >
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/")}
          style={{
            padding: 0,
            marginBottom: 25,
          }}
        >
          Back to Home
        </Button>

        <div
          style={{
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              margin: "0 auto 18px",
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, #1677ff, #69b1ff)",
              color: "#fff",
              fontSize: 30,
            }}
          >
            <SafetyOutlined />
          </div>

          <Title
            level={2}
            style={{
              marginBottom: 8,
            }}
          >
            Create Your Account
          </Title>

          <Paragraph
            type="secondary"
            style={{
              marginBottom: 0,
            }}
          >
            Join the Enterprise IT Helpdesk and manage
            your support requests easily.
          </Paragraph>
        </div>

        <Form
          layout="vertical"
          onFinish={handleRegister}
          requiredMark={false}
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your full name.",
              },
              {
                min: 2,
                message:
                  "Your name must contain at least 2 characters.",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Enter your full name"
            />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email.",
              },
              {
                type: "email",
                message:
                  "Please enter a valid email address.",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined />}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter a password.",
              },
              {
                min: 6,
                message:
                  "Password must contain at least 6 characters.",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Create a password"
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="password_confirmation"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message:
                  "Please confirm your password.",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    !value ||
                    getFieldValue("password") === value
                  ) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The passwords do not match."
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            block
            style={{
              height: 48,
              marginTop: 8,
            }}
          >
            Create Account
          </Button>
        </Form>

        <div
          style={{
            textAlign: "center",
            marginTop: 25,
          }}
        >
          <Text type="secondary">
            Already have an account?{" "}
          </Text>

          <Button
            type="link"
            onClick={() => navigate("/login")}
            style={{
              padding: 0,
            }}
          >
            Login
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Register;

