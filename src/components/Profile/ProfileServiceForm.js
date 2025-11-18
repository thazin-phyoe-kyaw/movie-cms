import { DatePicker, Form ,Row,Col,Input,Select,Button } from 'antd'
import moment from 'moment';
import React from 'react';
const { Option } =Select;

function ProfileServiceForm({loading,edit,submitHandler}) {
  return (
    <Form
        type="Edit"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{...edit,dateOfBirth:moment(edit.dateOfBirth)}}
        onFinish={(e) => submitHandler(e)}
        autoComplete="false"
        loading={loading}
      >
        <Form.Item label="id" name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
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
          name="phoneNumber"
          label="PhoneNumber"
          rules={[
            {
              required: false,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="imageUrl"
          label="Image"
          rules={[
            {
              required: false,
              message: "Please input your image!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: false,
              message: "Please select gender!",
            },
          ]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="dateOfBirth"
          label="Date Of Birth"
        >
         <DatePicker picker="date" />

        </Form.Item>
        <Row justify="end">
          <Col>
            <Form.Item>
              <Button loading={loading} disabled={loading} type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
  )
}

export default ProfileServiceForm