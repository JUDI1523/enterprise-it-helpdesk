import { useEffect } from "react";
import { ConfigProvider, theme } from "antd";

import AppRoutes from "./routes/AppRoutes";
import useAuthStore from "./store/authStore";
import useThemeStore from "./store/themeStore";

function App() {
  const loadCurrentUser = useAuthStore(
    (state) => state.loadCurrentUser
  );

  const mode = useThemeStore(
    (state) => state.mode
  );

  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          mode === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,

        token: {
          colorPrimary: "#1677ff",
          borderRadius: 8,
        },
      }}
    >
      <AppRoutes />
    </ConfigProvider>
  );
}

export default App;