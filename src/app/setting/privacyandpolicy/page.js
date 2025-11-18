"use client";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Anchor, Button, Flex, Space, Typography, notification } from "antd";
import React, { useState } from "react";
import { message, Upload } from "antd";
import axios from "axios";
import { errorMessage } from "@/lib/uiFunctions";

function TermsandConditions() {
  const [loading, setLoading] = useState(false);
  const [mmLoading, setMmLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [mmFileList, setmmFileList] = useState([]);
  const [api, contextHolder] = notification.useNotification({
    stack: 4,
  });

  const openNotification = (placement) => {
    api.info({
      message: `Uploaded Successfully`,
      placement,
    });
  };

  // upload to api
  const handleUpload = async (type) => {
    type == "en" ? setLoading(true) : setMmLoading(true);
    const formData = new FormData();
    formData.append("file", type == "en" ? fileList[0] : mmFileList[0]);
    await axios
      .post("/api/setting/upload_privacy", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        type == "en" ? setFileList([]) : setmmFileList([]);
      })
      .catch((e) => {
        errorMessage(e);
      })
      .finally(() => {
        type == "en" ? setLoading(false) : setMmLoading(false);
        openNotification("topRight");
      });
  };

  // show file remove
  const removeHandler = (file, type) => {
    if (type == "en") {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    } else {
      const index = mmFileList.indexOf(file);
      const newMmFileList = mmFileList.slice();
      newMmFileList.splice(index, 1);
      setmmFileList(newMmFileList);
    }
  };

  //check before upload
  const beforeUploadHandler = (file, type) => {
    const isPdf = file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      message.error("You can only upload PDF files!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("PDF must be smaller than 2MB!");
    }
    type == "en"
      ? setFileList([...fileList, file])
      : setmmFileList([...mmFileList, file]);
    return isPdf && isLt2M;
  };

  return (
    <>
      <div>
        {contextHolder}
        <Typography.Title level={1}>Privacy And Policy</Typography.Title>
        <Flex justify="space-around">
          <Space
            direction="vertical"
            style={{
              width: "30%",
            }}
            size="small"
          >
            <Typography> English</Typography>

            <Upload
              listType="picture"
              maxCount={1}
              onRemove={(file) => removeHandler(file, "en")}
              beforeUpload={(file) => beforeUploadHandler(file, "en")}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            <Button
              type="primary"
              onClick={() => handleUpload("en")}
              disabled={fileList.length === 0}
              loading={loading}
              style={{
                marginTop: 16,
              }}
            >
              {loading ? "Uploading" : "Start Upload"}
            </Button>
          </Space>

          <Space
            direction="vertical"
            style={{
              width: "30%",
            }}
            size="small"
          >
            <Typography> Myanmar</Typography>

            <Upload
              listType="picture"
              maxCount={1}
              onRemove={(file) => removeHandler(file, "mm")}
              beforeUpload={(file) => beforeUploadHandler(file, "mm")}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            <Button
              type="primary"
              onClick={() => handleUpload("mm")}
              disabled={mmFileList.length === 0}
              loading={mmLoading}
              style={{
                marginTop: 16,
              }}
            >
              {mmLoading ? "Uploading" : "Start Upload"}
            </Button>
          </Space>
        </Flex>
      </div>
    </>
  );
}

export default TermsandConditions;
