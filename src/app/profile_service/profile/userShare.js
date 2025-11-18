"use client";
import { Table } from "antd";
import { useState } from "react";

export default function UserShares({ data, closeDrawer }) {
  const [list, setList] = useState(data.data);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    perPage: 10,
    total: data.total,
  });
  //console.log(data)

  const filter = { userId: { value: data.userId, type: "id" } };

  const columns = [
    {
      title: "From User",
      dataIndex: "fromUser",
      align: "center",
    },
    {
      title: "To User",
      dataIndex: "toUser",
      align: "center",
    },
    {
      title: "Title",
      dataIndex: "titleId",
      align: "center",
    },
  ];
  
  return <Table columns={columns} dataSource={list} />;
  
}
