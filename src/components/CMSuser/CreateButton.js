"use client";
import React, { useState } from "react";
import { Drawer, Button } from "antd";
import CreateForm from "./CreateForm";
export default function CreateButon({ title, placement, children }) {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={showDrawer}
        style={{
          marginBottom: "10px",
        }}
      >
        Create
      </Button>
      <Drawer
        title={title}
        placement={placement}
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <CreateForm></CreateForm>
      </Drawer>
    </div>
  );
}
