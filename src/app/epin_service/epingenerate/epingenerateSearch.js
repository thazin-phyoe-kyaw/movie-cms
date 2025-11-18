import { Button, Col, Form, Input, Row, Select, Spin } from "antd";
import { CSVLink } from "react-csv";
import React, { useState } from "react";

const EpinSearch = ({ data, filter, setFilter, apiHandler, pagination }) => {
  function submitSearchHandler(payLoad) {
    const updatedFilter = Object.fromEntries(
      Object.entries(filter).map(([key, value]) => [
        key,
        {
          ...value,
          value: key == "epinGenerationJobId" ? value.value : payLoad[key],
        },
      ])
    );
    setFilter(updatedFilter);
    apiHandler(pagination.pageNumber, pagination.perPage, updatedFilter);
  }

  return (
    <Form onFinish={submitSearchHandler}>
      <Row justify="space-between" gutter={24}>
        <Col span={8}>
          <Form.Item label={"Serial No"} name={"serialNo"}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={"Status"} name={"status"}>
            <Select
              allowClear
              options={filter.status.enum.map((option) => ({
                value: option,
                label: option,
              }))}
            />
          </Form.Item>
        </Col>
        {/* <Col span={6}>
          <Form.Item label={"Batch"} name={"epinGenerationJob/batchNo"}>
            <Select allowClear onFocus={async () => await getEpinBatch()}>
              {loading && (
                <Select.Option disabled value="0">
                  <Row justify="center" gutter={[16, 16]}>
                    <Col>
                      <Spin />
                    </Col>
                  </Row>
                </Select.Option>
              )}
              {batchData.map((ea) => (
                <Select.Option key={uuidv4()} value={ea}>
                  {ea}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col> */}
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button style={{ margin: "0px 8px" }}>
              <CSVLink data={data} filename={"table-data.csv"}>
                Export
              </CSVLink>
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default EpinSearch;
