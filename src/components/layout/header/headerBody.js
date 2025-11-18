"use client";
import { Col, Layout, Row, ConfigProvider, theme, Typography } from "antd";
import UserDropdown from "@/components/layout/header/Dropdown";

export default function HeaderComponent({ permissions, user }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Layout>
        <Layout.Header style={{ padding: 0 }}>
          <Row justify="end" style={{ width: "100%" }}>
            <Col></Col>
            <Col style={{ marginRight: "30px" }}>
              <UserDropdown user={user} />
            </Col>
          </Row>
        </Layout.Header>
      </Layout>
    </ConfigProvider>
  );
}
