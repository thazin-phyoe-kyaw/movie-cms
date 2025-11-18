"use client";
import {
  message,
  Card,
  Col,
  Row,
  Typography,
  Spin,
  Upload,
  Button,
} from "antd";
import React, { useState } from "react";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";

const { Text } = Typography;

function TermsandConditions() {
  const [loading, setLoading] = useState({ en: false, mm: false });
  const [files, setFiles] = useState({
    engUrl: "",
    mmUrl: "",
  });

  // upload to api
  function uploadFile(event, type) {
    console.log(event);
    if (event.file.status === "uploading") {
      const upload = axios.post(
        "/api/setting/upload_terms",
        file.originFileObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return !!upload;
    }
  }

  //check before upload
  function beforeUploadHandler(file) {
    const isPdf = file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      message.error("You can only upload PDF files!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("PDF must be smaller than 2MB!");
    }
    return isPdf && isLt2M;
  }

  return (
    <Row gutter={[0, 12]}>
      <Col span={24}>
        <Text>Terms And Conditions</Text>
      </Col>
      <Col span={24}>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Card title="English">
              <Row>
                <Col span={24}>
                  <Upload
                    name="terms_en"
                    action="/api/setting/upload_terms"
                    accept="application/pdf"
                    beforeUpload={beforeUploadHandler}
                    method="post"
                    multiple={false}
                  >
                    <Button icon={<UploadOutlined />}>Upload Eng file</Button>
                  </Upload>
                </Col>
                <Col span={24}>
                  <Spin spinning={loading.en}>
                    <Text>display pdf here</Text>
                  </Spin>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="English">
              <Row>
                <Col span={24}>
                  <Upload
                    name="terms_mm"
                    action="/api/setting/upload_terms"
                    accept="application/pdf"
                    beforeUpload={beforeUploadHandler}
                    method="post"
                    multiple={false}
                  >
                    <Button icon={<UploadOutlined />}>
                      Upload Myanmar file
                    </Button>
                  </Upload>
                </Col>
                <Col span={24}>
                  <Spin spinning={loading.en}>
                    <Text>display pdf here</Text>
                  </Spin>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default TermsandConditions;
