import {
  Avatar,
  Card,
  Col,
  Row,
  Tag,
  Typography,
} from "antd";

import {
  MailOutlined,
  UserOutlined,
  SafetyOutlined,
} from "@ant-design/icons";

import DashboardLayout from "../../layouts/DashboardLayout";
import useAuthStore from "../../store/authStore";
import useLanguageStore from "../../store/languageStore";

const { Title, Text } = Typography;

function Profile() {
  const currentUser = useAuthStore(
    (state) => state.currentUser
  );

  const language = useLanguageStore(
    (state) => state.language
  );

  const text = {
    en: {
      title: "My Profile",
      subtitle: "View your account information.",
      accountInfo: "Account Information",
      fullName: "Full Name",
      email: "Email Address",
      role: "Role",
      user: "USER",
    },

    am: {
      title: "የእኔ መገለጫ",
      subtitle: "የመለያዎን መረጃ ይመልከቱ።",
      accountInfo: "የመለያ መረጃ",
      fullName: "ሙሉ ስም",
      email: "የኢሜይል አድራሻ",
      role: "ሚና",
      user: "ተጠቃሚ",
    },
  };

  const t = text[language];

  const getRoleColor = (role) => {
    if (role === "admin") return "red";
    if (role === "agent") return "blue";
    if (role === "customer") return "green";

    return "default";
  };

  return (
    <DashboardLayout>
      <Title level={2}>
        {t.title}
      </Title>

      <Text type="secondary">
        {t.subtitle}
      </Text>

      <Card
        style={{
          marginTop: 24,
          maxWidth: 800,
        }}
      >
        <Row
          gutter={[32, 32]}
          align="middle"
        >
          <Col xs={24} md={8}>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <Avatar
                size={120}
                icon={<UserOutlined />}
              />

              <Title
                level={3}
                style={{
                  marginTop: 16,
                  marginBottom: 4,
                }}
              >
                {currentUser?.name || "User"}
              </Title>

              <Tag
                color={getRoleColor(
                  currentUser?.role
                )}
              >
                {currentUser?.role?.toUpperCase() ||
                  t.user}
              </Tag>
            </div>
          </Col>

          <Col xs={24} md={16}>
            <Card
              type="inner"
              title={t.accountInfo}
            >
              <div
                style={{
                  marginBottom: 20,
                }}
              >
                <Text type="secondary">
                  <UserOutlined /> {t.fullName}
                </Text>

                <br />

                <Text strong>
                  {currentUser?.name || "N/A"}
                </Text>
              </div>

              <div
                style={{
                  marginBottom: 20,
                }}
              >
                <Text type="secondary">
                  <MailOutlined /> {t.email}
                </Text>

                <br />

                <Text strong>
                  {currentUser?.email || "N/A"}
                </Text>
              </div>

              <div>
                <Text type="secondary">
                  <SafetyOutlined /> {t.role}
                </Text>

                <br />

                <Tag
                  color={getRoleColor(
                    currentUser?.role
                  )}
                  style={{
                    marginTop: 6,
                  }}
                >
                  {currentUser?.role?.toUpperCase() ||
                    t.user}
                </Tag>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </DashboardLayout>
  );
}

export default Profile;

