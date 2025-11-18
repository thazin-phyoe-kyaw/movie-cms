"use client";
import FAQsForm from "@/components/Setting/FAQsForm";
import FAQtitleForm from "@/components/Setting/FAQtitle";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { nextQueryHandler } from "@/lib/globalFunctions";
import { QUERY_FAQ_CONST } from "@/lib/queryConst";
import SearchHandler from "@/lib/searchHandler";
import { errorMessage } from "@/lib/uiFunctions";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
  message,
} from "antd";
import axios from "axios";
import React, { useState } from "react";
const { Text } = Typography;

export default function Setting({ permissions, data }) {
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: data.total,
  });
  const [loading, setLoading] = useState(false);
  const [faqtitlesData, setFaqtitlesData] = useState(data.value);
  //const [faqsData, setFaqsData] = useState(data.value);

  const [editFaq, setEditFaq] = useState(false);
  const [edittitle, setEditTitle] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showtitleDrawer, setShowTitleDrawer] = useState(false);
  const [faqstitleId, setFaqsTitleId] = useState("");

  const [filter, setFilter] = useState(QUERY_FAQ_CONST.filter);
  const [order, setOrder] = useState(QUERY_FAQ_CONST.order);

  // draw

  function opentitleDrawer(createTitle) {
    if (createTitle) {
      setEditTitle(createTitle);
      setShowTitleDrawer(true);
    } else {
      setShowTitleDrawer(true);
    }
  }

  function closetitleDrawer() {
    setShowTitleDrawer(false);
    setEditTitle(false);
  }

  async function getDataList(pageNumber, perPage, updatedFilter = filter) {
    setLoading(true);
    // axios
    //   .get(
    //     `/api/setting/get_list${nextQueryHandler(newFilter, {
    //       pageNumber,
    //       perPage,
    //     })}`
    //   )
    axios
      .get(
        `/api/setting/get_list?${await apiQueryHandler(
          QUERY_FAQ_CONST,
          updatedFilter,
          order,
          QUERY_FAQ_CONST.fields,
          "normal",
          { pageNumber, perPage }
        )}`
      )
      .then(({ data: result }) => {
        //console.log(result,"mmm")
        if (result.value.length < 1) {
          message.warning("No found");
        }
        setPaging({
          pageNumber,
          perPage,
          total: result["@odata.count"],
        });
        setFaqtitlesData(result.value);
      })
      .catch((error) => {
        errorMessage(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  //console.log(faqtitlesData)
  function getfaqDataList(pageNumber, perPage, newFilter) {
    setLoading(true);
    axios
      .get(
        `/api/setting/faqget_list${nextQueryHandler(newFilter, {
          pageNumber,
          perPage,
        })}`
      )
      .then(({ data: result }) => {
        if (result.value.length < 1) {
          message.warning("No found");
        }
        setPaging({
          pageNumber,
          perPage,
          total: result["@odata.count"],
        });
        setFaqtitlesData(result.value);
      })
      .catch((error) => {
        errorMessage(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function deletefaqtitle(id) {
    //console.log(id)
    setLoading(true);
    axios
      .post("/api/setting/faqtitledelete", { id })
      .then(() => {
        getDataList(paging.pageNumber, paging.perPage, filter);
      })
      .catch((err) => errorMessage(err));
  }
  const [edit, setEdit] = useState(false);
  //console.log(faqstitleId, "mmm");
  function submitHandler(values) {
    console.log(values, "hhhh");
    if (!editFaq) {
      setLoading(true);
      axios
        .post(`/api/setting/create`, {
          questionEn: values.questionEn,
          questionMm: values.questionMm,
          answerEn: values.answerEn,
          answerMm: values.answerMm,
          status: values.status,
          sequence: values.sequence,
          faqtitleId: values.faqtitleId,
        })
        .then(() => {
          getDataList(paging.pageNumber, paging.perPage, filter);
          closeDrawer();
        })
        .catch((error) => {
          errorMessage(error);
          //console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      axios
        .post(`/api/setting/update`, {
          id: values.id,
          questionEn: values.questionEn,
          questionMm: values.questionMm,
          answerEn: values.answerEn,
          answerMm: values.answerMm,
          status: values.status,
          sequence: values.sequence,
          faqtitleId: values.faqtitleId,
        })
        .then(() => {
          closeDrawer();
          getDataList(paging.pageNumber, paging.perPage, filter);
        })
        .catch((error) => {
          errorMessage(error);
          //console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }
  function openDrawer(titleId, record) {
    console.log(titleId, record);
    if (!record) {
      //
      setFaqsTitleId(titleId);
      setShowDrawer(true);
    } else {
      setEditFaq(record);
      setShowDrawer(true);
    }
  }

  function closeDrawer() {
    setShowDrawer(false);
    setEditFaq(false);
  }

  //console.log(data.value,"hhh")
  function FormHandler() {
    //console.log(faqstitleId, "iii");
    return (
      <FAQsForm
        loading={loading}
        editFaq={editFaq}
        submitHandler={submitHandler}
        faqtitlesData={faqtitlesData}
        faqstitleId={faqstitleId}
      ></FAQsForm>
    );
  }
  //console.log(faqtitlesData)
  function titlesubmitHandler(values) {
    console.log(values);
    if (!edittitle) {
      setLoading(true);
      axios
        .post(`/api/setting/faqtitlecreate`, {
          //id: values.id,
          titleEn: values.titleEn,
          titleMm: values.titleMm,
        })
        .then(() => {
          closetitleDrawer();
          getDataList(paging.pageNumber, paging.perPage, filter);
        })
        .catch((error) => {
          errorMessage(error);
          //console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      axios
        .post(`/api/setting/faqtitleupdate`, {
          id: values.id,
          titleEn: values.titleEn,
          titleMm: values.titleMm,
        })
        .then(() => {
          closetitleDrawer();
          setFaqtitlesData(paging.pageNumber, paging.perPage, filter);
          //setFaqtitlesData(paging.pageNumber, paging.perPage, filter);
        })
        .catch((error) => {
          //errorMessage(error);
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  function TitleformHandler() {
    return (
      <FAQtitleForm
        loading={loading}
        edittitle={edittitle}
        titlesubmitHandler={titlesubmitHandler}
      />
    );
  }

  const columns = [
    {
      title: "Title English",
      dataIndex: "titleEn",
      align: "center",
    },
    {
      title: "Title Myanmar",
      dataIndex: "titleMm",
      align: "center",
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <Row justify="end" gutter={12}>
          <Col>
            <Button
              type="primary"
              onClick={() => openDrawer(record.id)}
              disabled={!permissions.includes("SETTING_READ")}
            >
              Add Faqs
            </Button>
          </Col>
          <Col>
            <Tooltip>
              <Button
                type="primary"
                icon={<EditOutlined />}
                permission={"SETTING_UPDATE"}
                onClick={() => opentitleDrawer(record)}
              ></Button>
            </Tooltip>
          </Col>
          <Col>
            <Popconfirm
              title="Delete FAQTitle"
              description={`Are you sure delete this question?`}
              onConfirm={() => deletefaqtitle(record.id)}
              //permission={"SETTING_DELETE"}
              okText="Delete"
              cancelText="Cancel"
            >
              <Button type="primary" danger icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Row
      gutter={[16, 16]}
      style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}
    >
      <Col span={24}>
        <Row justify="space-between" align="center" gutter={24}>
        <Col span={18} flex="auto">
            <SearchHandler
              filter={filter}
              setFilter={setFilter}
              order={order}
              setOrder={setOrder}
              pagination={paging}
              apiHandler={getDataList}
            />
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => opentitleDrawer()}
              disabled={!permissions.includes("SETTING_READ")}
            >
              Add Faqs Title
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Table
          loading={loading}
          dataSource={faqtitlesData}
          columns={columns}
          rowKey={(record) => record.id}
          pagination={{
            total: paging.total,
            defaultCurrent: 1,
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50],
            onChange: (pageNumber, perPage) => {
              getDataList(pageNumber, perPage, filter);
            },
          }}
          expandable={{
            rowExpandable: (record) => true,
            expandedRowRender: (record) => {
              if (record["FAQss@odata.count"] > 0) {
                const columns = [
                  {
                    title: "Sequence",
                    dataIndex: "sequence",
                    key: "sequence",
                    sorter: (a, b) => a.sequence - b.sequence,
                  },
                  {
                    title: "Question (English)",
                    dataIndex: "questionEn",
                    key: "questionEn",
                  },
                  {
                    title: "Question (Myanmar)",
                    dataIndex: "questionMm",
                    key: "questionMm",
                  },
                  {
                    title: "Status",
                    dataIndex: "status",
                    key: "status",
                  },
                  {
                    title: "Actions",
                    dataIndex: "actions",
                    key: "actions",
                    render: (_, record) => (
                      <Space>
                        <Button
                          type="primary"
                          onClick={() => openDrawer(null, record)}
                        >
                          <EditOutlined />
                        </Button>
                        {/* <Button
                          type="primary"
                          danger
                          onClick={() => handleDelete(record.id)}
                        >
                          <DeleteOutlined />
                        </Button> */}
                      </Space>
                    ),
                  },
                ];
                return (
                  <Table
                    columns={columns}
                    dataSource={record.FAQss}
                    rowKey={(faq) => faq.id}
                    expandable={{
                      expandedRowRender: (faq) => (
                        <div>
                          <p>{faq.answerEn}</p>
                          <p>{faq.answerMm}</p>
                        </div>
                      ),
                    }}
                    pagination={false}
                  />
                );
              } else {
                return <p>No FAQs available for this title.</p>;
              }
            },
          }}
        />
      </Col>

      <Drawer
        title="FAQs"
        placement="right"
        width={1000}
        open={showDrawer}
        onClose={() => closeDrawer()}
        destroyOnClose
      >
        {FormHandler()}
      </Drawer>

      <Drawer
        title="FAQstitle"
        placement="right"
        width={800}
        open={showtitleDrawer}
        onClose={() => closetitleDrawer()}
        destroyOnClose
      >
        {TitleformHandler()}
      </Drawer>
    </Row>
  );
}
