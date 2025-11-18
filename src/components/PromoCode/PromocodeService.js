
import { Button, Col, DatePicker, Form, Input, Row, Select, Spin } from 'antd';
import { debounce } from 'lodash';
import React from 'react'
const {RangePicker} = DatePicker;


function PromocodeService({loading,edit,submitHandler,disabledStartDate,getTitleList,titleLoading,titleList,episodeLoading,episodeList,getEpisodeList}) {

  return (
    <Form
    name="promocode"
    autoComplete="false"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    initialValues={
      { ...edit, eventDate: [edit.startDate, edit.endDate] }
        ? edit
        : { required: false }
    }
    onFinish={(e) => submitHandler(e)}
    loading={loading}
  >
    <Form.Item
      name="name"
      label="Name"
      rules={[
        {
          required: false,
          message: "Please input your name!",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="description"
      label="Description"
      rules={[
        {
          required: false,
          message: "Please input your description!",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="eventDate"
      label="Event Date"
      rules={[
        {
          required: true,
          message: "Please input your event date!",
        },
      ]}
    >
      <RangePicker disabledDate={disabledStartDate} />
    </Form.Item>
    <Form.Item
      name="useableCount"
      label="Useable Count"
      rules={[
        {
          required: false,
          message: "Please input your code!",
        },
      ]}
    >
      <Input />
    </Form.Item>
    {edit ? (
      <Form.Item label="id" name="id" hidden>
        <Input />
      </Form.Item>
    ) : (
      <div>
        <Form.Item
          name="titleId"
          label="Title Name"
          rules={[
            {
              required: false,
              message: "Please input your titleId!",
            },
          ]}
        >
          <Select
            // options={titleList}
            onSearch={debounce((value) => {
              getTitleList(value);
            }, 1500)}
            showSearch
            // defaultActiveFirstOption={false}
            filterOption={false}
          >
            {titleLoading && (
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
        <Form.Item
          name="episodeId"
          label="Episode Name"
          rules={[
            {
              required: false,
              message: "Please input your episodeId!",
            },
          ]}
        >
          <Select
            // options={titleList}
            onSearch={debounce((value) => {
              getEpisodeList(value);
              // console.log("Searching for:", value);
            }, 1000)}
            showSearch
            // defaultActiveFirstOption={false}
            filterOption={false}
          >
            {episodeLoading && (
              <Select.Option disabled value="0">
                <Row justify="center" gutter={[16, 16]}>
                  <Col>
                    <Spin loading />
                  </Col>
                </Row>
              </Select.Option>
            )}

            {episodeList?.map((season) =>
              season.episodes.map((episode) => (
                //console.log(episode)
                // Map through each episode in the season
                <Select.Option key={episode.value} value={episode.value}>
                  {episode.label}
                </Select.Option>
              ))
            )}
          </Select>
        </Form.Item>
        <Form.Item
          name="code"
          label="Code"
          rules={[
            {
              required: true,
              message: "Please input your code!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>
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
  )
}

export default PromocodeService