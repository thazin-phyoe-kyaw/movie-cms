import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";

function EpinActivateForm({loading,activateEpin,actiEpin}){
    return (
        <Form
        name="Epin Avtivate"
        initialValues={actiEpin}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={(e) => activateEpin(e)}
        autoComplete="false"
        loading={loading}
      >
        <Form.Item
          label="BatchNo"
          name="batchNo"
          rules={[
            {
              required: true,
              message: "Please input batch No",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input price",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: "Please input status",
            },
          ]}
        >
          <Select placeholder="Select the status">
            <Option value="inactive">Inactive</Option>
            <Option value="active">Active</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Expired Duration"
          name="expiredDuration"
          rules={[
            {
              required: true,
              message: "Please input expired duration",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Row justify="end">
          <Col>
            <Form.Item>
              <Button
                loading={loading}
                disabled={loading}
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
}
export default EpinActivateForm;
