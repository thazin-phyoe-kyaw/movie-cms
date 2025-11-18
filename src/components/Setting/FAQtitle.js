import { Button, Col, Form, Input, Row } from "antd";
import React from "react";

function FAQtitleForm({ loading, titlesubmitHandler, edittitle }) {
  return (
    <Form
      name="FAQS Title"
      autoComplete="false"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={ edittitle ?  { ...edittitle } : { required: false }}
      onFinish={(e) => titlesubmitHandler(e)}
      loading={loading}
    >
      <Form.Item
            name="titleEn"
            label="Title English"
            rules={[
              {
                required: true,
                message: "Please input title English!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="titleMm"
            label="Title Myanmar"
            rules={[
              {
                required: true,
                message: "Please input title Myanmar!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
      {edittitle ? (
        <Form.Item name="id" label="Id" hidden>
          <Input />
        </Form.Item>
      ) : (
        <>
          
        </>
      )}

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
  );
}

export default FAQtitleForm;
