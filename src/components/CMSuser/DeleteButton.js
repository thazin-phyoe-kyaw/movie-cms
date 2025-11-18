"use client";
import React from "react";
import { Popconfirm, message, Button } from "antd";

export default function DeleteButton() {
  const confirm = (e) => {
   // console.log(e);
    message.success("Click on Yes");
  };

  const cancel = (e) => {
   // console.log(e);
    message.error("Click on No");
  };

  return (
    <Popconfirm
      title="Are you sure delete this task?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <Button
        href="#"
        style={{
          backgroundColor: "#f55860",
          color: "white",
          margin: "0 8px",
        }}
      >
        Delete
      </Button>
    </Popconfirm>
  );
}
