"use client";

import { ADS_ENUM_ADS_LOCATION, ADS_ENUM_IMAGE_RATIO } from "@/lib/const";
import { Button, Col, Form, Row, Select } from "antd";
import axios from "axios";

export default function AdListForm({ closeAdList, editAd, loading }) {
  function submitHandler({ adsLocation, imageRatio }) {
    if (editAd) {
      axios
        .post("/api/ad_list/update", { adsLocation, id: editAd.id })
        .then((res) => {
          closeAdList(true);
        })
        .catch((err) => errorMessage(err))
        .finally(() => closeAdList());
    } else {
      axios
        .post("/api/ad_list/create", { adsLocation, imageRatio })
        .then((res) => {
          closeAdList(true);
        })
        .catch((err) => errorMessage(err))
        .finally(closeAdList());
    }
  }

  return (
    <Form
      name="adList"
      autoComplete="false"
      initialValues={editAd ? editAd : ""}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={(e) => submitHandler(e)}
    >
      <Form.Item
        name="adsLocation"
        label="Location"
        rules={[
          {
            required: true,
            message: "Location required",
          },
        ]}
      >
        <Select>
          {ADS_ENUM_ADS_LOCATION.map((location) => (
            <Select.Option key={location}>{location}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="imageRatio"
        label="Image Ratio"
        rules={[
          {
            required: true,
            message: "Image Ratio is required",
          },
        ]}
      >
        <Select>
          {ADS_ENUM_IMAGE_RATIO.map((ratio) => (
            <Select.Option key={ratio}>{ratio}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Row justify="end">
        <Col>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
