"use client";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Popconfirm, Row, Table } from "antd";
import { useState } from "react";

export default function UserDevice({ data, closeDrawer }) {
  const [list, setList] = useState(data.data);
  // const [pagination, setPgination] = useState({
  //   pageNumber: 1,
  //   perPage: 10,
  //   total: data.total,
  // });
  //console.log(data)
  const [loading, setLoading] = useState(false);
  const filter = { userId: { value: data.userId, type: "id" } };

  const columns = [
    {
      title: "NetworkType",
      dataIndex: "networkType",
      align: "center",
    },
    {
      title: "DeviceId",
      dataIndex: "deviceId",
      align: "center",
    },
    {
      title: "OperatorName",
      dataIndex: "operatorName",
      align: "center",
    },
    {
      title: "Os",
      dataIndex: "os",
      align: "center",
    },
    {
      title: "Os Version",
      dataIndex: "osVersion",
      align: "center",
    },
    {
      title: "DeviceType",
      dataIndex: "deviceType",
      align: "center",
    },
    {
      title: "DeviceName",
      dataIndex: "deviceName",
      align: "center",
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <Row justify="end" gutter={12}>
          <Col>
            <Popconfirm
              title="Delete User"
              description={`Are you sure delete this device?`}
              // onConfirm={()=>
              // }
              okText="Delete"
              cancelText="Cancel"
            >
              <Button type="primary" danger icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <>
      <Table loading={loading} columns={columns} dataSource={list} />;
    </>
  );
}
