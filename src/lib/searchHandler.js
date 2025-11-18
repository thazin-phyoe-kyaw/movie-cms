"use client";

import { Button, Col, Collapse, Form, Input, Row, Select } from "antd";
import { useRef, useState } from "react";

export default function SearchHandler({
  filter,
  setFilter,
  order,
  setOrder,
  pagination,
  apiHandler,
  // submitSearchHandler,
}) {
  const filterArr = Object.entries(filter);
  const orderArr = Object.entries(order);
  function submitSearchHandler(payLoad) {
    const updatedFilter = Object.fromEntries(
      Object.entries(filter).map(([key, value]) => [
        key,
        {
          ...value,
          value: payLoad[key] !== undefined ? payLoad[key] : undefined,
        },
      ])
    );
    setOrder({ ...order, updatedAt: payLoad.order });
    // console.log(updatedFilter, "this is update filter");
    setFilter(updatedFilter);
    apiHandler(pagination.pageNumber, pagination.perPage, updatedFilter);
  }

  const items = [
    {
      label: "Search",
      children: (
        <Form onFinish={submitSearchHandler}>
          <Row justify="space-between" gutter={24}>
            {filterArr.map(([key, value], index) =>
              value.type == "string" ||
              value.type == "foreign" ||
              value.type == "foreignString" ? (
                <Col key={index} span={11}>
                  <Form.Item label={value.label} name={key}>
                    <Input />
                  </Form.Item>
                </Col>
              ) : (
                <Col key={index} span={11}>
                  <Form.Item label={value.label} name={key}>
                    <Select
                      // defaultValue={value.value ? value.value : ""}
                      allowClear
                      options={
                        value.enum
                          ? value.enum.map((option) => ({
                              value: option,
                              label: option,
                            }))
                          : []
                      }
                    />
                  </Form.Item>
                </Col>
              )
            )}
            <Col span={11}>
              <Form.Item label="order by" name="order">
                <Select
                  allowClear
                  options={orderArr
                    .filter(([key]) => key !== "updatedAt")
                    .map(([key, value]) => {
                      return { key: value, value: value };
                    })}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="end" gutter={12}>
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
  ];

  return <Collapse items={items} size="small" />;
}
