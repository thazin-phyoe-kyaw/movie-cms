"use client";
import { Form, Input, Button } from "antd";

export default function EditForm() {
  const onFinish = (values) => {
   // console.log("Received values:", values);
  };

  return (
    <Form name="login-form" onFinish={onFinish}>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please enter your username",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please enter your password",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
}
