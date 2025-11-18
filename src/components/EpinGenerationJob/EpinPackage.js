import { Button, Col, Form, Input, Row } from "antd";
import React from "react";

function EpinPackageForm({loading,editpackage,submitHandler}){
    return(
        <Form
        type="Edit"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={editpackage}
        onFinish={(e) => submitHandler(e)}
        autoComplete="false"
        loading={loading}
      >
        <Form.Item label="id" name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input your name!",
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

export default EpinPackageForm;