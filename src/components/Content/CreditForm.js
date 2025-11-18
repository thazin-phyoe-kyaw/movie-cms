import React, { useState } from "react";
import { Form, Button, Row, Col, Input, InputNumber } from "antd";
import { errorMessage } from "@/lib/uiFunctions";
import axios from "axios";
function CreditForm({ edit, closeForm }) {
  const [loading, setLoading] = useState(false);
  function submitHandler({
    nameMm,
    nameEn,
    keywords,
    profileImage,
    coverImage,
    actorAcademy,
    directorAcademy,
    ownerAcademy,
    bioEn,
    bioMm,
    startYear,
    endYear,
  }) {
    setLoading(true);
    if (edit) {
      axios
        .post("/api/content_credits/update", {
          id: edit.id,
          nameMm,
          nameEn,
          keywords,
          profileImage,
          coverImage,
          actorAcademy,
          directorAcademy,
          ownerAcademy,
          bioEn,
          bioMm,
          startYear,
          endYear,
        })
        .then((res) => closeForm())
        .catch((err) => errorMessage(err))
        .finally(() => setLoading(false));
    } else {
      axios
        .post("/api/content_credits/create", {
          nameMm,
          nameEn,
          keywords,
          profileImage,
          coverImage,
          actorAcademy,
          directorAcademy,
          ownerAcademy,
          bioEn,
          bioMm,
          startYear,
          endYear,
        })
        .then((res) => closeForm())
        .catch((err) => errorMessage(err))
        .finally(() => setLoading(false));
    }
  }
  return (
    <Form
      name="credits"
      autoComplete="false"
      initialValues={edit ? edit : " "}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={submitHandler}
    >
      <Form.Item
        name="nameMm"
        label="MM Title"
        rules={[
          {
            required: false,
            message: "Title  is required",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="nameEn"
        label="En Title"
        rules={[
          {
            required: false,
            message: "Title  is required",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="keywords" label="Keywords">
        <Input />
      </Form.Item>
      <Form.Item name="profileImage" label="Profile Image">
        <Input />
      </Form.Item>
      <Form.Item name="coverImage" label="Cover Image">
        <Input />
      </Form.Item>
      <Form.Item name="actorAcademy" label="Actor Academy" type="number">
        <Input />
      </Form.Item>
      <Form.Item name="directorAcademy" label="Director Academy" type="number">
        <Input />
      </Form.Item>
      <Form.Item name="ownerAcademy" label="Owner Academy" type="number">
        <Input />
      </Form.Item>
      <Form.Item name="bioEn" label="Bio En">
        <Input />
      </Form.Item>
      <Form.Item name="bioMm" label="Bio Mm">
        <Input />
      </Form.Item>
      <Form.Item name="startYear" label="Start Year" type="number">
        <InputNumber min={1800}></InputNumber>
      </Form.Item>
      <Form.Item name="endYear" label="End Year" type="number">
        <InputNumber min={1800}></InputNumber>
      </Form.Item>

      <Row justify="end">
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default CreditForm;
