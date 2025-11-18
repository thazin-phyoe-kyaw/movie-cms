"use client";
import React from "react";
import {
  Card,
  Form,
  Image,
  Input,
  InputNumber,
  Typography,
  Upload,
} from "antd";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { errorMessage } from "@/lib/uiFunctions";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Row, Table, Col, Drawer } from "antd";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_CONTENT_EPISODE_CONST } from "@/lib/queryConst";
export default function Seasonbody({ permissions, preData }) {
  const uploadProps = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    listType: "picture",
    maxCount: 1,
  };

  const search = useSearchParams();
  const seasonId = search.get("seasonId");
  const MODIFIED_CONTENT_EPISODE_CONST = {
    ...QUERY_CONTENT_EPISODE_CONST,
    seasonId: {
      value: seasonId,
      type: "foreign",
      label: "Series",
      query: "",
    },
  };
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: preData?.count,
  });
  const [data, setData] = useState(preData?.value);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const columns = [
    {
      title: "Keyword",
      dataIndex: "keywords",
    },
    {
      title: "EN Title",
      dataIndex: "titleEn",
    },
    {
      title: "MM Title",
      dataIndex: "titleMm",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      align: "right",
      render: (_, record) => {
        return (
          <Button
            type="primary"
            icon={<EditOutlined />}
            // disabled={!permissions.includes("CONTENT_SERIES_EDIT")}
            onClick={() => showDrawer(record)}
          />
        );
      },
    },
  ];
  function closeDrawer() {
    setShow(false);
    setEdit("");
  }

  function showDrawer(data) {
    if (data) setEdit(data);
    setShow(true);
  }
  async function getData(pageNumber, perPage) {
    setLoading(true);
    axios
      .get(
        `/api/episode/get_episodes?${await apiQueryHandler(
          QUERY_CONTENT_EPISODE_CONST,
          MODIFIED_CONTENT_EPISODE_CONST,
          QUERY_CONTENT_EPISODE_CONST.order,
          QUERY_CONTENT_EPISODE_CONST.fields,
          "no_child",
          {
            pageNumber,
            perPage,
          }
        )}`
      )
      .then(({ data: result }) => {
        setPaging({
          pageNumber,
          perPage,
          total: result["@odata.count"],
        });
        if (result.value && result.value.length !== 0) {
          setData([...result.value]);
        }
        setShow(false);
      })
      .catch((error) => {
        errorMessage(error);
      })
      .finally(() => {
        setLoading(false);
        setShow(false);
      });
  }

  function submitHandler({
    keywords,
    titleMm,
    titleEn,
    descriptionEn,
    descriptionMm,
    posterPortrait,
    posterLandscape,
    fullHdFileSize,
    hdFileSize,
    sdFileSize,
    streamingUrl,
    downloadUrl,
    duration,
  }) {
    setLoading(true);
    if (edit) {
      axios
        .post("/api/episode/update", {
          id: edit.id,
          keywords,
          titleMm,
          titleEn,
          descriptionEn,
          descriptionMm,
          posterPortrait,
          posterLandscape,
          fullHdFileSize: fullHdFileSize + "MB",
          hdFileSize: hdFileSize + "MB",
          sdFileSize: sdFileSize + "MB",
          streamingUrl,
          downloadUrl,
          seasonId,
          duration,
        })
        .then((res) => getData(paging.pageNumber, paging.perPage))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      axios
        .post("/api/episode/create", {
          keywords,
          titleMm,
          titleEn,
          descriptionEn,
          descriptionMm,
          posterPortrait,
          posterLandscape,
          fullHdFileSize: fullHdFileSize + "MB",
          hdFileSize: hdFileSize + "MB",
          sdFileSize: sdFileSize + "MB",
          streamingUrl,
          downloadUrl,
          seasonId,
          duration,
        })
        .then((res) => getData(paging.pageNumber, paging.perPage))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }
  function expandRowHandler(record) {
    return (
      <Card>
        <Row>
          <Col span={12}>
            <Row>
              <Col span={6}>Mm Description</Col>
              <Col span={18}>
                <Typography>{record.descriptionMm}</Typography>
              </Col>
            </Row>
            <Row>
              <Col span={6}>En Description</Col>
              <Col span={18}>
                <Typography>{record.descriptionEn}</Typography>
              </Col>
            </Row>

            <Row>
              <Col span={6}>Full HD File Size</Col>
              <Col span={18}>
                <Typography>{record.fullHdFileSize}</Typography>
              </Col>
            </Row>
            <Row>
              <Col span={6}> HD File Size</Col>
              <Col span={18}>
                <Typography>{record.hdFileSize}</Typography>
              </Col>
            </Row>
            <Row>
              <Col span={6}>SD File Size</Col>
              <Col span={18}>
                <Typography>{record.sdFileSize}</Typography>
              </Col>
            </Row>
            <Row>
              <Col span={6}>Streaming URL</Col>
              <Col span={18}>
                <a href={record.streamingUrl}>{record.streamingUrl}</a>
              </Col>
            </Row>
            <Row>
              <Col span={6}>Download Url</Col>
              <Col span={18}>
                <a href={record.downloadUrl}>{record.downloadUrl}</a>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Image src={record.posterLandscape}></Image>
          </Col>
        </Row>
      </Card>
    );
  }

  function FormHandler() {
    return (
      <Form
        name="episodes"
        autoComplete="false"
        initialValues={edit ? edit : {}}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={submitHandler}
      >
        <Form.Item
          name="keywords"
          label="Keywords"
          rules={[
            {
              required: false,
              message: "Keywords  is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="titleMm"
          label="Mm Title"
          rules={[
            {
              required: false,
              message: "Title  is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="titleEn"
          label="EN Title"
          rules={[
            {
              required: false,
              message: "Title  is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="descriptionEn" label="Description EN">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="descriptionMm" label="Description MM">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="streamingUrl" label="Streaming Url">
          <Input />
        </Form.Item>
        <Form.Item name="duration" label="Duration">
          <Input />
        </Form.Item>
        <Form.Item name="downloadUrl" label="Download Url">
          <Input />
        </Form.Item>
        <Form.Item name="posterLandscape" label="Poster Landscape">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Landscape Image</Button>
          </Upload>
        </Form.Item>
        <Upload name="avatar" />
        <Form.Item name="posterPortrait" label="Poster Portrait">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Portrait Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="fullHdFileSize" label="Full HD">
          <InputNumber style={{ width: "420px" }} />
        </Form.Item>
        <Form.Item name="hdFileSize" label="HD">
          <InputNumber style={{ width: "420px" }} />
        </Form.Item>
        <Form.Item name="sdFileSize" label="SD">
          <InputNumber style={{ width: "420px" }} />
        </Form.Item>
        <Row justify="end">
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row justify="end" gutter={16}>
          <Col>
            <Button
              type="primary"
              onClick={() => showDrawer()}
              disabled={!permissions.includes("CONTENT_SERIE_CREATE")}
            >
              Create
            </Button>
          </Col>
        </Row>
      </Col>
      <Col
        span={24}
        style={{
          height: "calc(100vh - 144px)",
          overflow: "hidden",
          overflowY: "auto",
        }}
      >
        <Table
          rowKey={(e) => e.id}
          dataSource={data}
          columns={columns}
          loading={loading}
          expandable={{
            rowExpandable: (record) => true,
            expandedRowRender: (record) => expandRowHandler(record),
          }}
          pagination={{
            total: paging.total,
            defaultCurrent: 1,
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50],
            onChange: (pageNumber, perPage) => {
              getData(pageNumber, perPage);
            },
          }}
        ></Table>
      </Col>
      <Drawer
        title={edit ? "Edit Episode" : "Create Episode"}
        placement="right"
        onClose={() => closeDrawer()}
        open={show}
        width="700"
        destroyOnClose
      >
        {FormHandler()}
      </Drawer>
    </Row>
  );
}
