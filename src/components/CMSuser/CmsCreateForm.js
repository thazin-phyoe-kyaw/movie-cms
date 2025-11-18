import { nextQueryHandler } from "@/lib/globalFunctions";
import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";
import axios from "axios";
const Option={Select};

function CmsCreateUserForm({loading,edit,submitHandler,accessList,passwordChecker}){
return(
    <Form
        name="cmsUser"
        autoComplete="false"
        initialValues={edit ? edit : { required: false }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={(e) => submitHandler(e)}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {edit ? (
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
        ) : (
          <div>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Email is required",
                },
                {
                    validator: (_, value) => {
                        const regexStr = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      
                        if (!regexStr.test(value)) {
                          return Promise.reject("Please enter a valid email address");
                        }
                      return axios
                        .get(
                          `/api/user/getList${nextQueryHandler(
                            { email: { value, type: "string" } },
                            { pageNumber: 1, perPage: 10 }
                          )}`
                        )
                        .then(({ data }) => {
                          if (data.value && data.value.length > 0) {
                            return Promise.reject("Email is already exist");
                          } else {
                            return Promise.resolve();
                          }
                        });
                    } 
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Password is Required",
                },
                {
                  validator(_, value) {
                    if (passwordChecker(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Password must be at least 8 character and used special characters."
                    );
                  },
                },
              ]}
            >
              <Input type="password" />
            </Form.Item>
          </div>
        )}
        <Form.Item
          name="phoneNumber"
          label="Phone No"
          rules={[
            {
              required: false,
              message: "Phone Number is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: false,
              message: "Address is Required",
            },
          ]}
        >
          <Input.TextArea role={3} />
        </Form.Item>
        <Form.Item
          name="accessLevelId"
          label="AccessLevel"
          rules={[
            {
              required: true,
              message: "Access Lvl required",
            },
          ]}
        >
           <Select>
          {accessList.map((access) => (
            <Select.Option key={access.id} value={access.id}>
              {access.name}
            </Select.Option>
          ))}
        </Select>
        </Form.Item>
        <Form.Item
          name="siteAdminNote"
          label="SiteAdminNote"
          rules={[
            {
              required: false,
              message: "Site Admin Note is Require",
            },
          ]}
        >
          <Input.TextArea role={3} />
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
)
}
export default CmsCreateUserForm;