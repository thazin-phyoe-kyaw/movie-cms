import { Button, Col, DatePicker, Form, Input, Row, Select, Spin } from "antd";
//import { load } from "npm";
import React from "react";

function EpinGenJob({
  loading,
  editEpin,
  submitEpinGenerateHandler,
  getPlanList,
  debounce,
  planIdList,
  planLoading,
}) {
  return (
    <Form
      name="epingenerate"
      initialValues={editEpin ? editEpin : ""}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={(e) => submitEpinGenerateHandler(e)}
      autoComplete="false"
      loading={loading}
    >
      <Form.Item
        label="Package"
        name="planId"
        rules={[
          {
            required: true,
            message: "Please input Package!",
          },
        ]}
      >
        <Select
          onSearch={debounce((value) => {
            getPlanList(value);
          }, 1000)}
          showSearch
          filterOption={false}
          onFocus={() => {
            getPlanList(""); // Load all data when the user clicks on the select
          }}
        >
          {planLoading && (
            <Select.Option disabled value="0">
              <Row justify="center" gutter={[16, 16]}>
                <Col>
                  <Spin loading />
                </Col>
              </Row>
            </Select.Option>
          )}
          {planIdList.map((plan) => (
            <Select.Option key={plan.planId} value={plan.planId}>
              {plan.planId}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: false,
            message: "Please input description!",
          },
        ]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>
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
        <Input disabled={editEpin} />
      </Form.Item>
      <Form.Item
        label="Prefix"
        name="prefix"
        rules={[
          {
            required: true,
            message: "Please inout your prefix",
          },
        ]}
      >
        <Input disabled={editEpin} />
      </Form.Item>
      <Form.Item
        label="Number of Epin"
        name="count"
        rules={[
          {
            required: true,
            message: "Please input Number of Epin!",
          },
        ]}
      >
        <Input disabled={editEpin} />
      </Form.Item>
      <Form.Item
        label="Lot"
        name="lot"
        rules={[
          {
            required: true,
            message: "Please input Lot!",
          },
        ]}
      >
        <Input disabled={editEpin} />
      </Form.Item>
      <Form.Item
        label="Expire Date"
        name="expireDate"
        rules={[
          {
            required: true,
            message: "Please input Expire Date",
          },
        ]}
      >
        <DatePicker />

        {/* <Input disabled={editEpin} /> */}
      </Form.Item>
      {editEpin ? (
        <Form.Item label="id" name="id" hidden>
          <Input />
        </Form.Item>
      ) : (
        <></>
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

export default EpinGenJob;
