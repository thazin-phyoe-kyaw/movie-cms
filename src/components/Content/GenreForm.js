import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Row, Col, Input } from "antd";
import { errorMessage } from "@/lib/uiFunctions";

function GenreForm({ closeForm, edit }) {
  const [loading, setLoading] = useState(false);
  function submitHandler({ nameMm, nameEn }) {
    setLoading(true);
    if (edit) {
      axios
        .post("/api/content_genres/update", {
          id: edit.id,
          nameMm,
          nameEn,
        })
        .then((res) => closeForm())
        .catch((err) => errorMessage(err))
        .finally(() => setLoading(false));
    } else {
      axios
        .post("/api/content_genres/create", {
          nameMm,
          nameEn,
        })
        .then((res) => closeForm())
        .catch((err) => errorMessage(err))
        .finally(() => setLoading(false));
    }
  }
  return (
    <Form
      name="genres"
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
        label="EN Title"
        rules={[
          {
            required: false,
            message: "Title  is required",
          },
        ]}
      >
        <Input />
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

export default GenreForm;
