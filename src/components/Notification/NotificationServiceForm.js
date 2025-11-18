import { Button, Col, DatePicker, Form, Input, Row, Select, Spin } from "antd";
import React from "react";

function NotificationForm({loading,getTopicList,submitHandler,topicLoading,topicIdList,handleReferenceTypeChange,referenceType,debounce,isSchdule,handleIsScheduleChange}){
    return(
        <Form
        name="Notification"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={(e) => submitHandler(e)}
        autoComplete="false"
        loading={loading}
      >
        <Form.Item
          label="Select Topic"
          name="topicId"
          rules={[
            {
              required: true,
              message: "Please input topicId!",
            },
          ]}
        >
          <Select
            onSearch={debounce((value) => {
              getTopicList(value);
            }, 1500)}
            showSearch
            filterOption={false}
            defaultActiveFirstOption={false}
            onFocus={() => {
              getTopicList(""); // Load all data when the user clicks on the select
            }}
          >
            {topicLoading && (
              <Select.Option disabled value="0">
                <Row justify="center" gutter={[16, 16]}>
                  <Col>
                    <Spin loading />
                  </Col>
                </Row>
              </Select.Option>
            )}

            {topicIdList.map((topic) => (
              <Select.Option key={topic.value} value={topic.value}>
                {topic.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="NotiTitle"
          name="notiTitle"
          rules={[
            {
              required: true,
              message: "Please input NotiTitle",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="NotiDescription"
          name="notiDescription"
          rules={[
            {
              required: true,
              message: "Please input Noti Description",
            },
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          rules={[
            {
              required: false,
              message: "Please input image!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="ReferenceType"
          name="referenceType"
          rules={[
            {
              required: false,
              message: "Please input Reference Type!",
            },
          ]}
        >
          <Select
            placeholder="Select movie, series, or Web URL"
            onChange={handleReferenceTypeChange}
            defaultValue="default"
          >
            <Option value="movie">Movie</Option>
            <Option value="series">Series</Option>
            <Option value="episode">Episodes</Option>
            <Option value="events">Events</Option>
            <Option value="webUrl">Web URL</Option>
            <Option value="normal">Default</Option>
          </Select>
        </Form.Item>

        {referenceType === "movie" ||
        referenceType === "series" ||
        referenceType === "episode" ? (
          <>
            <Form.Item label="ReferencedId" name="referencedId">
              <Input />
            </Form.Item>
          </>
        ) : referenceType === "webUrl" ? (
          <Form.Item label="ReferenceUrl" name="referenceUrl">
            <Input />
          </Form.Item>
        ) : null}

        <Form.Item
          label="Is Schedule"
          name="isSchedule"
          rules={[
            {
              required: true,
              message: "Please input is schedule!",
            },
          ]}
        >
          <Select
            placeholder="select type"
            onChange={handleIsScheduleChange}
            defaultValue="false"
          >
            <Option value="true">True</Option>
            <Option value="false">False</Option>
          </Select>
        </Form.Item>
        {isSchdule && (
          <Form.Item
            label="Send Date"
            name="sendDate"
            rules={[
              {
                required: false,
                message: "Please input send date!",
              },
            ]}
          >
            <DatePicker showTime hidden />
          </Form.Item>
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
                Send
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
}

export default NotificationForm;