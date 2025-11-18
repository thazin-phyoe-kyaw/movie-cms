import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";

function FAQsForm({ loading, editFaq, submitHandler, faqstitleId }) {
  //console.log(faqstitleId)
  return (
    <Form
      name="FAQs"
      autoComplete="off"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={
        editFaq
          ? { ...editFaq, status: editFaq.status ? 'true' : 'false' }
          : { faqtitleId: faqstitleId }
      }
      onFinish={(e) => submitHandler(e)}
      loading={loading}
    >
      <Form.Item
        name="questionEn"
        label="Question English"
        rules={[
          {
            required: false,
            message: "Please input question English!",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="questionMm"
        label="Question Myanmar"
        rules={[
          {
            required: false,
            message: "Please input question Myanmar!",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="answerEn"
        label="Answer English"
        rules={[
          {
            required: false,
            message: "Please input Answer English!",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="answerMm"
        label="Answer Myanmar"
        rules={[
          {
            required: false,
            message: "Please input Answer Myanmar!",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      {/* <Form.Item
            name="sequence"
            label="Sequence"
            rules={[
              {
                required: false,
                message: "Please input Sequence!",
              },
            ]}
          >
            <Input />
          </Form.Item> */}
      <Form.Item
        name="status"
        label="Status"
        rules={[
          {
            required: false,
            message: "Please input status!",
          },
        ]}
      >
        <Select placeholder="Select">
          <Select.Option value="true">True</Select.Option>
          <Select.Option value="false">False</Select.Option>
        </Select>
      </Form.Item>
      {editFaq ? (
        <Form.Item label="id" name="id" hidden>
          <Input />
        </Form.Item>
      ) : (
        <>
          <Form.Item label="FAQsTitleId" name="faqtitleId" hidden>
            <Input value={faqstitleId} />
          </Form.Item>
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

export default FAQsForm;
