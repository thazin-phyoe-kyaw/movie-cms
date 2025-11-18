import React from "react";
import { Row, Col, Button, Form, Input, Select } from "antd";
const { TextArea } = Input;
export function SubscriptionServiceForm({
  loading,
  editPlans,
  submitHandler,
  data,
}) {
  console.log(data)
  return (
    <Form
      name="plans"
      autoComplete="false"
      initialValues={
        editPlans
          ? {
              ...editPlans,
              gateWays: data,
              active: editPlans.active ? "true" : "false",
            }
          : {  gateWays: data,required: false }
      }
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 17 }}
      onFinish={(e) => submitHandler(e)}
    >
      <Form.Item
        name="titleMm"
        label="Title (MY)"
        rules={[
          {
            required: false,
            message: "title require!.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="titleEng"
        label="Title (Eng)"
        rules={[
          {
            required: true,
            message: "title require!.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="planId"
        label="PlanId"
        rules={[
          {
            required: true,
            message: "planId require!.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="duration"
        label="Duration"
        rules={[
          {
            required: true,
            message: "duration require!.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="costDisplay"
        label="Price"
        rules={[
          {
            required: true,
            message: "costDisplay require!.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="currency"
        label="Currency"
        rules={[
          {
            required: true,
            message: "Currency require!.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="descriptionMm"
        label="Description (MY)"
        rules={[
          {
            required: false,
            message: "description require!.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="descriptionEng"
        label="Description (Eng)"
        rules={[
          {
            required: false,
            message: "description require!.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="featuredImage"
        label="FeaturedImage"
        rules={[
          {
            required: false,
            message: "featuredImage require!.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gateWays"
        label="GateWays"
        rules={[
          {
            required: true,
            message: "gateWays require!.",
          },
        ]}
      >
          <Input value={editPlans.gateWays} disabled/>
      </Form.Item>
      <Form.Item
        name="active"
        label="Active"
        rules={[
          {
            required: false,
            message: "Please select IsActive or InActive!",
          },
        ]}
      >
        <Select>
          <Option value="true">IsActive</Option>
          <Option value="false">InActive</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="termsAndConditionMm"
        label="Terms & Conditions (MY)"
        rules={[
          {
            required: false,
            message: "",
          },
        ]}
      >
        <TextArea rows={6} />
      </Form.Item>
      <Form.Item
        name="termsAndConditionEng"
        label="Terms & Conditions (Eng)"
        rules={[
          {
            required: false,
            message: "",
          },
        ]}
      >
        <TextArea rows={6} />
      </Form.Item>
      {editPlans ? (
        <Form.Item label="id" name="id" >
          <Input />
        </Form.Item>
      ) : (
        <></>
      )}
      <Row justify="end">
        <Col>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
