"use client";

import { Table } from "antd";
import { useState } from "react";

export default function Like({ data, closeDrawer }) {
  const [list, setList] = useState(data.data);
  const [pagination, setPgination] = useState({
    pageNumber: 1,
    perPage: 10,
    total: data.total,
  });
  const filter = { userId: { value: data.userId, type: "id" } };

  const columns = [
    {
      title: "Title",
      dataIndex: ["title","titleMm"],
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "type",
      align: "center",
    },
    {},
  ];

 // console.log(list);

  return <Table columns={columns} dataSource={list} />;
}
