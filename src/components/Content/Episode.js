"use client";
import React, { useEffect } from "react";
import { Card, Form, Image, Input, InputNumber, Typography } from "antd";
import axios from "axios";
import { errorMessage } from "@/lib/uiFunctions";
import { EditOutlined } from "@ant-design/icons";
import { Button, Row, Table, Col, Drawer } from "antd";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_CONTENT_EPISODE_CONST } from "@/lib/queryConst";
import SearchHandler from "@/lib/searchHandler";
import { useSearchParams } from "next/navigation";

export default function Episode({ permissions, record }) {
  const updatedFilter = {
    ...QUERY_CONTENT_EPISODE_CONST.filter,
    seasonId: {
      value: record?.id,
      type: "foreign",
      label: "Episode",
      query: "",
    },
  };
  // export default function Seasonbody({ permissions, preData }) {
  const search = useSearchParams();
  const seasonId = search.get("seasonId");
  const MODIFIED_CONTENT_EPISODE_CONST = {
    ...QUERY_CONTENT_EPISODE_CONST,

    seasonId: {
      value: record?.id,
      type: "foreign",
      label: "Series",
      query: "",
    },
  };
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: 10,
  });
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);

  const [loadingEpisode, setLoadingEpisode] = useState(false);

  const [filter, setFilter] = useState(QUERY_CONTENT_EPISODE_CONST.filter);
  const [order, setOrder] = useState(QUERY_CONTENT_EPISODE_CONST.order);

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
  async function getData(pageNumber, perPage, updatedFilter) {
    setLoading(true);
    axios
      .get(
        `/api/episode/get_episodes?${await apiQueryHandler(
          QUERY_CONTENT_EPISODE_CONST,
          updatedFilter,
          order,
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
        console.log(error);
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
          seasonId: record.id,
          duration,
        })
        .then((res) => getData(paging.pageNumber, paging.perPage))
        .catch((err) => console.log(err));
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
          seasonId: record.id,
          duration,
        })
        .then((res) => getData(paging.pageNumber, paging.perPage))
        .catch((err) => console.log(err));
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
        <Form.Item name="posterPortrait" label="Poster Portrait">
          <Input />
        </Form.Item>
        <Form.Item name="posterLandscape" label="Poster Landscape">
          <Input />
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
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
  const fetchData = async () => {
    try {
      setLoadingEpisode(true);
      const result = await axios.get(
        `/api/episode/get_episodes?${await apiQueryHandler(
          QUERY_CONTENT_EPISODE_CONST,
          updatedFilter,
          QUERY_CONTENT_EPISODE_CONST.order,
          QUERY_CONTENT_EPISODE_CONST.fields,
          "no_child",
          {
            pageNumber: paging.pageNumber,
            perPage: paging.perPage,
          }
        )}`
      );

      setData(result.data.value);
    } catch (error) {
      console.log(error);
      // errorMessage(error);
    } finally {
      setLoadingEpisode(false);
    }
  };

  useEffect(() => {
    if (record?.id) {
      fetchData();
    }
  }, [record]);
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row justify="space-between" align="center" gutter={24}>
          <Col span={18} flex="auto">
            <SearchHandler
              filter={filter}
              setFilter={setFilter}
              order={order}
              setOrder={setOrder}
              pagination={paging}
              apiHandler={getData}
            />
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => showDrawer()}
              disabled={!permissions.includes("CONTENT_SERIE_CREATE")}
            >
              Create Episode
            </Button>
          </Col>
        </Row>
      </Col>
      <Col
        span={24}
        style={{
          overflow: "hidden",
          overflowY: "auto",
        }}
      >
        <Table
          rowKey={(e) => e.id}
          dataSource={data}
          columns={columns}
          loading={loadingEpisode}
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
