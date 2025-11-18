"use client";
import React from "react";

import { useState } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Row,
  Typography,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import { LogOutButton } from "../../CMSuser/loginButton";
import { DownOutlined } from "@ant-design/icons";
import { signOut } from "next-auth/react";
export default function UserDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onFinish = (values) => {
    if (values.newPassword === values.confirmPassword) {
      axios
        .post(`/api/user/passwordReset`, {
          email: user.email,
          password: values.newPassword,
        })
        .then((res) => {
          signOut();
        })
        .catch((err) => {
          errorMessage;
        });
      message.success("Password Reset Successfully");
    } else {
      message.error("Password must be same");
    }

    setIsModalOpen(false);
  };
  const items = [
    {
      key: "1",
      label: (
        <Button type="link" size="small" onClick={() => setOpen(true)}>
          User Profile
        </Button>
      ),
    },
    {
      key: "2",
      label: <LogOutButton />,
    },
  ];

  return (
    <div>
      <Drawer
        title="User Profile"
        placement="right"
        closable={true}
        onClose={() => setOpen(false)}
        width={500}
        open={open}
      >
        <Card title={` Welcome ${user.name}`} bordered={false}>
          <Row>
            <Col span={6}>
              <Typography>Email:</Typography>
            </Col>
            <Col span={18}>
              <Typography>{user.email}:</Typography>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Typography>Address:</Typography>
            </Col>
            <Col span={18}>
              {" "}
              <Typography>{user.address}:</Typography>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Typography>Phone NO:</Typography>
            </Col>
            <Col span={18}>
              <Typography>{user.phoneNumber}</Typography>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Typography>Note:</Typography>
            </Col>
            <Col span={18}>
              <Typography>{user.siteAdminNote}</Typography>
            </Col>
          </Row>
          <Button
            type="primary"
            style={{ marginTop: "10px" }}
            onClick={() => setIsModalOpen(true)}
          >
            Reset Password
          </Button>
        </Card>
      </Drawer>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form name="myForm" onFinish={onFinish}>
          <Form.Item label="Email" name="email" initialValue={user.email}>
            <Input placeholder={user.email} disabled={true} />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please enter your Old Password" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please enter your New Password" },
            ]}
          >
            <Input />
          </Form.Item>
          <Row justify="end">
            <Col>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: "8px" }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button type="default" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          {user.name?.replace(/b\w/g, (match) => match.toUpperCase())}
          <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
}
