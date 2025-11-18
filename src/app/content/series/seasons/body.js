"use client";
import React from "react";
import axios from "axios";
import { DatePicker, Form, Input } from "antd";
import { useSearchParams } from "next/navigation";
import { errorMessage } from "@/lib/uiFunctions";
import { EditOutlined } from "@ant-design/icons";
import { Button, Row, Table, Col, Drawer } from "antd";
import { useState } from "react";
import Link from "next/link";
import moment from "moment";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_CONTENT_SEASON_CONST } from "@/lib/queryConst";
export default function Seasonbody({ permissions, preData }) {
  const search = useSearchParams();
  const seriesId = search.get("seriesId");
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: preData?.count,
  });
  const [data, setData] = useState(preData?.value);
  const updatedFilter = {
    ...QUERY_CONTENT_SEASON_CONST.filter,
    seriesId: {
      value: seriesId,
      type: "foreign",
      label: "Series",
      query: "",
    },
  };
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  function showDrawer(data) {
    if (data) setEdit(data);
    setShow(true);
  }
  const columns = [
    {
      title: "Keyword",
      dataIndex: "keywords",
    },
    {
      title: "EN Title",
      dataIndex: "nameEn",
    },
    {
      title: "MM Title",
      dataIndex: "nameMm",
    },
    {
      title: "Episodes",
      dataIndex: "episodes",
      align: "right",
      render: (_, record) => {
        return (
          <Link
            href={{
              pathname: "/content/series/seasons/episodes",
              query: { seasonId: record.id },
            }}
          >
            Episodes
          </Link>
        );
      },
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
  async function getData(pageNumber, perPage) {
    setLoading(true);
    axios
      .get(
        `/api/season/get_seasons?${await apiQueryHandler(
          QUERY_CONTENT_SEASON_CONST,
          updatedFilter,
          QUERY_CONTENT_SEASON_CONST.order,
          QUERY_CONTENT_SEASON_CONST.fields,
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

  function showDrawer(data) {
    if (data) setEdit(data);
    setShow(true);
  }

  function submitHandler({ publishDate, keywords, nameMm, nameEn }) {
    setLoading(true);
    const dateString = moment(publishDate).format("YYYY-MM-DDTHH:mm:ss[Z]");
    if (edit) {
      axios
        .post("/api/season/update", {
          id: edit.id,
          nameMm,
          nameEn,
          keywords,
          publishDate: dateString,
          seriesId,
        })
        .then((res) => getData(paging.pageNumber, paging.perPage))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      axios
        .post("/api/season/create", {
          nameMm,
          nameEn,
          keywords,
          publishDate: dateString,
          seriesId,
        })
        .then((res) => getData(paging.pageNumber, paging.perPage))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }

  function FormHandler() {
    return (
      <Form
        name="seasons"
        autoComplete="false"
        initialValues={
          edit
            ? {
                keywords: edit.keywords,
                nameMm: edit.nameMm,
                nameEn: edit.nameEn,
              }
            : {}
        }
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
          name="nameMm"
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
          name="nameEn"
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
        <Form.Item name="publishDate" label="publishDate">
          <DatePicker style={{ width: "100%" }} />
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
        title={edit ? "Edit Season" : "Create Season"}
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
