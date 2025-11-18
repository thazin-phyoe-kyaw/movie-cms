"use client";
import React, { useState } from "react";
import { Drawer, Button } from "antd";
import EditForm from "./EditForm";
export default function EditButton({ title, placement, children }) {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        Edit
      </Button>
      <Drawer
        title={title}
        placement={placement}
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <EditForm></EditForm>
      </Drawer>
    </div>
  );
}
