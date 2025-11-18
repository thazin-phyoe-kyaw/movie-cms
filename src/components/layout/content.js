"use client";
import { Layout, theme, ConfigProvider } from "antd";

export default function Content({ children }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Layout>
        <Layout.Content
          style={{ minHeight: "calc(100vh-64px)" }}
          theme="dark"
        >
          <div style={{ padding: "16px" }}>{children}</div>
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
}
