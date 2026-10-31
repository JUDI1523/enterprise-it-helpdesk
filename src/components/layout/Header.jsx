import { Button, Typography, Space, Select } from "antd";
import {
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import useThemeStore from "../../store/themeStore";
import useAuthStore from "../../store/authStore";
import useLanguageStore from "../../store/languageStore";

const { Text } = Typography;

function Header() {
  const navigate = useNavigate();

  const currentUser = useAuthStore(
    (state) => state.currentUser
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  const mode = useThemeStore(
    (state) => state.mode
  );

  const toggleTheme = useThemeStore(
    (state) => state.toggleTheme
  );

  const language = useLanguageStore(
    (state) => state.language
  );

  const setLanguage = useLanguageStore(
    (state) => state.setLanguage
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const text = {
    en: {
      logout: "Logout",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
      english: "English",
      amharic: "አማርኛ",
    },
    am: {
      logout: "ውጣ",
      darkMode: "ጨለማ ሁነታ",
      lightMode: "ብርሃን ሁነታ",
      english: "English",
      amharic: "አማርኛ",
    },
  };

  const currentText = text[language];

  return (
    <div
      style={{
        height: 64,
        padding: "0 24px",
        background:
          mode === "dark" ? "#141414" : "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom:
          mode === "dark"
            ? "1px solid #303030"
            : "1px solid #e8e8e8",
      }}
    >
      <Typography.Title
        level={4}
        style={{
          margin: 0,
          color: "#417ca3",
        }}
      >
        Enterprise IT Helpdesk
      </Typography.Title>

      <Space>
        <div style={{ textAlign: "right" }}>
          <Text
            strong
            style={{
              color:
                mode === "dark"
                  ? "#ffffff"
                  : undefined,
            }}
          >
            {currentUser?.name}
          </Text>

          <br />

          <Text type="secondary">
            {currentUser?.role}
          </Text>
        </div>

        <Select
          value={language}
          onChange={setLanguage}
          suffixIcon={<GlobalOutlined />}
          style={{ width: 120 }}
          options={[
            {
              value: "en",
              label: `🇬🇧 ${currentText.english}`,
            },
            {
              value: "am",
              label: `🇪🇹 ${currentText.amharic}`,
            },
          ]}
        />

        <Button
          type="text"
          onClick={toggleTheme}
          icon={
            mode === "light" ? (
              <MoonOutlined />
            ) : (
              <SunOutlined />
            )
          }
        >
          {mode === "light"
            ? currentText.darkMode
            : currentText.lightMode}
        </Button>

        <Button
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          {currentText.logout}
        </Button>
      </Space>
    </div>
  );
}

export default Header;

