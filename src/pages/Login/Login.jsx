import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  Typography,
} from "antd";
import {
  LockOutlined,
  MailOutlined,
  LoginOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";

const { Title, Text, Paragraph } = Typography;

function Login() {
  const navigate = useNavigate();

  const login = useAuthStore(
    (state) => state.login
  );

  const loading = useAuthStore(
    (state) => state.loading
  );

  const [error, setError] = useState("");

  const handleLogin = async (values) => {
    setError("");

    const success = await login(
      values.email,
      values.password
    );

    if (!success) {
      setError(
        "Invalid email or password. Please try again."
      );
      return;
    }

    const user =
      useAuthStore.getState().currentUser;

    if (user?.role === "admin") {
      navigate("/admin/dashboard", {
        replace: true,
      });
    } else if (user?.role === "agent") {
      navigate("/agent/dashboard", {
        replace: true,
      });
    } else {
      navigate("/customer/dashboard", {
        replace: true,
      });
    }
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
      <Card
        style={{
          width: "100%",
          maxWidth: 460,
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
              color: "#ffffff",
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
            Welcome Back
          </Title>

          <Paragraph
            type="secondary"
            style={{
              marginBottom: 0,
            }}
          >
            Sign in to your Enterprise IT Helpdesk
            account.
          </Paragraph>
        </div>

        {error && (
          <Alert
            message="Login failed"
            description={error}
            type="error"
            showIcon
            style={{
              marginBottom: 20,
            }}
          />
        )}

        <Form
          layout="vertical"
          onFinish={handleLogin}
          requiredMark={false}
          initialValues={{
            email: "",
            password: "",
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              {
                required: true,
                message:
                  "Please enter your email address.",
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
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message:
                  "Please enter your password.",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              autoComplete="new-password"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={<LoginOutlined />}
            loading={loading}
            block
            style={{
              height: 48,
              marginTop: 8,
            }}
          >
            Login
          </Button>
        </Form>

        <div
          style={{
            textAlign: "center",
            marginTop: 25,
          }}
        >
          <Text type="secondary">
            Don't have an account?{" "}
          </Text>

          <Button
            type="link"
            onClick={() => navigate("/register")}
            style={{
              padding: 0,
            }}
          >
            Create an account
          </Button>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: 15,
          }}
        >
          <Button
            type="link"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Login;

