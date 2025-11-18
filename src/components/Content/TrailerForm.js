import React, { useState } from "react";
import { Form, Button, Row, Col, Input, Select, Spin } from "antd";
import { debounce } from "lodash";
function TrailerForm({
  loading,
  edit,
  submitHandler,
  titleList,
  getTitleList,
}) {
  const [titleId, setTitleId] = useState(edit?.titleId?.id);
  return (
    <Form
      name="roles"
      autoComplete="false"
      initialValues={{ ...edit, titleId: edit?.titleId?.titleMm }}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={(values) => submitHandler({ ...values, titleId })}
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
      <Form.Item
        name="trailerUrl"
        label="Trailer URL"
        rules={[
          {
            required: false,
            message: "URL  is required",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Title" name="titleId" initialValue={edit?.titleId}>
        <Select
          onSearch={debounce((value) => {
            getTitleList(value);
          }, 1500)}
          showSearch
          filterOption={false}
          labelInValue
          onChange={(selectedOption) => setTitleId(selectedOption?.value)}
        >
          {loading && (
            <Select.Option disabled value="0">
              <Row justify="center" gutter={[16, 16]}>
                <Col>
                  <Spin loading />
                </Col>
              </Row>
            </Select.Option>
          )}

          {titleList.map((title) => (
            <Select.Option key={title.value} value={title.value}>
              {title.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
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

export default TrailerForm;
