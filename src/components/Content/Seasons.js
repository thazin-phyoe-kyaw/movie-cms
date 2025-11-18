"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Table,
  Col,
  Drawer,
  Form,
  Input,
  DatePicker,
  Card,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_CONTENT_SEASON_CONST } from "@/lib/queryConst";
import { errorMessage } from "@/lib/uiFunctions";
import SearchHandler from "@/lib/searchHandler";
import Episode from "./Episode";
import { useSearchParams } from "next/navigation";
export default function Seasons({ seriesId }) {
  const [loadingSeasons, setLoadingSeasons] = useState(false);
  const [show, setShow] = useState(false);
  const [seasons, setSeasons] = useState([]);
  const [edit, setEdit] = useState(null);
  const search = useSearchParams();
  // const seriesId = search.get("seriesId");
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: 10,
  });

  const [data, setData] = useState([]);

  const [filter, setFilter] = useState(QUERY_CONTENT_SEASON_CONST.filter);
  const [order, setOrder] = useState(QUERY_CONTENT_SEASON_CONST.order);
  console.log(data);
  useEffect(() => {
    if (record?.id) {
      fetchData();
    }
  }, [record]);

  const showDrawer = (data) => {
    if (data) setEdit(data);
    setShow(true);
  };

  const closeDrawer = () => {
    setShow(false);
    setEdit("");
  };

  const expandRowHandler = (record) => (
    <Row>
      <Col span={24}>
        <Episode permissions={permissions} record={{ ...record }} />
      </Col>
    </Row>
  );

  const seriesColumn = [
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
      title: "Actions",
      dataIndex: "actions",
      align: "right",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => showDrawer(record)}
        />
      ),
    },
  ];

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

  const submitHandler = ({ publishDate, keywords, nameMm, nameEn }) => {
    const dateString = moment(publishDate).format("YYYY-MM-DDTHH:mm:ss[Z]");
    if (edit) {
      axios
        .post("/api/season/update", {
          id: edit.id,
          nameMm,
          nameEn,
          keywords,
          publishDate: dateString,
          seriesId: record.id,
        })
        .then((res) => getData(paging.pageNumber, paging.perPage))
        .catch((err) => errorMessage(err));
    } else {
      axios
        .post("/api/season/create", {
          nameMm,
          nameEn,
          keywords,
          publishDate: dateString,
          seriesId: record.id,
        })
        .then((res) => getData(paging.pageNumber, paging.perPage))
        .catch((err) => console.log(err));
    }
  };

  const fetchData = async () => {
    try {
      setLoadingSeasons(true);
      const result = await axios.get(
        `/api/season/get_seasons?${await apiQueryHandler(
          QUERY_CONTENT_SEASON_CONST,
          updatedFilter,
          QUERY_CONTENT_SEASON_CONST.order,
          QUERY_CONTENT_SEASON_CONST.fields,
          "no_child",
          {
            pageNumber: paging.pageNumber,
            perPage: paging.perPage,
          }
        )}`
      );

      setSeasons(result.data.value);
    } catch (error) {
      errorMessage(error);
    } finally {
      setLoadingSeasons(false);
    }
  };

  const updatedFilter = {
    ...QUERY_CONTENT_SEASON_CONST.filter,
    seriesId: {
      value: record?.id,
      type: "foreign",
      label: "Series",
      query: "",
    },
  };

  const getData = async (pageNumber, perPage, updatedFilter = filter) => {
    setLoading(true);
    axios
      .get(
        `/api/season/get_seasons?${await apiQueryHandler(
          QUERY_CONTENT_SEASON_CONST,
          updatedFilter,
          order,
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
          setSeasons([...result.value]);
        }
      })
      .catch((error) => {
        errorMessage(error);
      })
      .finally(() => {
        setLoading(false);
        setShow(false);
      });
  };

  return (
    <Col span={24}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row justify="end" gutter={16}>
            {/* <Col>
              <Button
                type="primary"
                style={{ marginTop: "15px" }}
                onClick={() => showDrawer()}
                disabled={!permissions.includes("CONTENT_SERIE_CREATE")}
              >
                Create Season
              </Button>
            </Col> */}
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Row justify="space-between" gutter={24}>
                <Col span={22} flex="auto">
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
                    // disabled={!permissions.includes("CONTENT_SERIE_CREATE")}
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
                dataSource={seasons}
                columns={seriesColumn}
                loading={loadingSeasons}
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
                expandable={{
                  rowExpandable: (record) => true,
                  expandedRowRender: (record) => expandRowHandler(record),
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
        </Col>
      </Row>
    </Col>
  );
}
