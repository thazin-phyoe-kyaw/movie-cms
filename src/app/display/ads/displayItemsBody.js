"use client";
import {
  Col,
  Row,
  Card,
  Button,
  Popconfirm,
  Typography,
  Drawer,
  Form,
  Input,
  Select,
  Table,
  Space,
  Modal,
  Tag,
  Spin,
} from "antd";
import axios from "axios";
import { errorMessage } from "@/lib/uiFunctions";
import { useState } from "react";
import { ADS_ENUM_BANNER } from "@/lib/const";
import ImageUpload from "@/components/generals/imageUpload";
import { debounce } from "lodash";

import {
  DeleteOutlined,
  EditOutlined,
  StopOutlined,
  ToTopOutlined,
} from "@ant-design/icons";
import { QUERY_DISPLAY_ADS_ITEMS_CONST } from "@/lib/queryConst";
import { apiQueryHandler } from "@/lib/apiQueryHandler";

export default function ADItemList({ selectList }) {
  const [data, setData] = useState(selectList.data);
  const [adsListId, setAdslistId] = useState(selectList.listId);
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 8,
    total: selectList?.count,
  });
  const [edit, setEdit] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [titleList, setTitleList] = useState([]);
  const [titleLoading, setTitleLoading] = useState(false);
  const [bannerTypeValue, setBannerTypeValue] = useState("");
  const [showSeqDrawer, setShowSeqDrawer] = useState(false);
  const [seqData, setSeqData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titles, setTitles] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  function openSeqDrawer() {
    setShowSeqDrawer(true);
    getSequenceData(1, 100);
  }

  function getTiltes() {
    axios
      .get("/api/general/get_title_by_name")
      .then((res) => setTitles(res.data.value))
      .catch((err) => errorMessage(err));
  }

  function openForm(data) {
    if (data) {
      setEdit(data);
      setBannerTypeValue(data.bannerType);
    }
    getTiltes();
    setShowDrawer(true);
  }

  function closeForm() {
    setShowDrawer(false);
    setEdit(false);
    setBannerTypeValue("");
  }
  function getTitleList(name) {
    setTitleLoading(true);
    axios
      .get(
        `/api/general/get_title_by_name?name=${name}&pageNumber=1&perPage=15`
      )
      .then(({ data }) => {
        const old = titleList.map((title) => title.value);
        const nwList = data.value.filter((title) => !old.includes(title.id));

        setTitleList([
          ...nwList.map((title) => ({ label: title.titleMm, value: title.id })),
          ...titleList,
        ]);
      })
      .catch((err) => {
        errorMessage(err);
      })
      .finally(() => setTitleLoading(false));
  }

  async function loadMoreData() {
    const nextPageNumber = paging.pageNumber + 1;
    if (!loading) {
      setLoading(true);
      axios
        .get(
          `/api/ad_list_items/get_ad_list_items?${await apiQueryHandler(
            QUERY_DISPLAY_ADS_ITEMS_CONST,
            QUERY_DISPLAY_ADS_ITEMS_CONST.filter,
            QUERY_DISPLAY_ADS_ITEMS_CONST.order,
            ["id", "name", "sequence"],
            "normal",
            { pageNumber: nextPageNumber, perPage: paging.perPage }
          )}`
        )
        .then(({ data: result }) => {
          if (result.value && result.value.length !== 0) {
            setData((prevData) => [...prevData, ...result.value]);
            setPaging({
              pageNumber: nextPageNumber,
              perPage: paging.perPage,
              total: result["@odata.count"],
            });
          }
        })
        .catch((error) => {
          errorMessage(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  async function getSequenceData(pageNumber, perPage) {
    console.log(
      await apiQueryHandler(
        QUERY_DISPLAY_ADS_ITEMS_CONST,
        QUERY_DISPLAY_ADS_ITEMS_CONST.filter,
        QUERY_DISPLAY_ADS_ITEMS_CONST.order,
        ["id", "name", "sequence"],
        "normal",
        { pageNumber, perPage }
      )
    );
    setLoading(true);
    axios
      .get(
        `/api/ad_list_items/get_ad_list_items?${await apiQueryHandler(
          QUERY_DISPLAY_ADS_ITEMS_CONST,
          QUERY_DISPLAY_ADS_ITEMS_CONST.filter,
          QUERY_DISPLAY_ADS_ITEMS_CONST.order,
          ["id", "name", "sequence"],
          "normal",
          { pageNumber, perPage }
        )}`
      )
      .then(({ data: result }) => {
        console.log(result);
        setSeqData(
          result.value
            ? result.value
                .sort((a, b) => a.sequence - b.sequence)
                .map((value) => {
                  return { ...value, sequence: value.sequence };
                })
            : []
        );
      })
      .catch((error) => {
        error.message;
      })
      .finally(() => {
        setLoading(false);
      });
  }
  async function getDataItems(pageNumber, perPage) {
    setLoading(true);
    axios
      .get(
        `/api/ad_list_items/get_ad_list_items?${await apiQueryHandler(
          QUERY_DISPLAY_ADS_ITEMS_CONST,
          QUERY_DISPLAY_ADS_ITEMS_CONST.filter,
          QUERY_DISPLAY_ADS_ITEMS_CONST.order,
          QUERY_DISPLAY_ADS_ITEMS_CONST.fields,
          "normal",
          { pageNumber, perPage }
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
        setShowDrawer(false);
      })
      .catch((error) => {
        errorMessage(error);
      })
      .finally(() => {
        setLoading(false);
        setShowDrawer(false);
      });
  }

  function submitItemHandler({
    name,
    bannerType,
    htmlCode,
    webLink,
    imageUrl,
    titleId,
  }) {
    if (edit) {
      axios
        .post("/api/ad_list_items/upate", {
          id: edit.id,
          name,
          bannerType,
          htmlCode,
          webLink,
          imageUrl,
          titleId,
        })
        .then((res) => getDataItems(paging.pageNumber, paging.perPage))
        .catch((err) => errorMessage(err));
    } else {
      axios
        .post("/api/ad_list_items/create", {
          name,
          bannerType,
          htmlCode,
          webLink,
          imageUrl,
          adsListId,
          titleId: "f309d79d-c3f1-11ed-bf4d-0e001b930b03",
        })

        .then((res) => getDataItems(paging.pageNumber, paging.perPage))
        .catch((err) => errorMessage(err));
    }
  }

  function publishAdItem(id, status) {
    setLoading(true);
    axios
      .post("/api/ad_list_items/publish", { id: id, isPublish: status })
      .then((res) => getDataItems(paging.pageNumber, paging.perPage))
      .catch((err) => errorMessage(err));
  }

  function deleteAdItem(id) {
    axios
      .post("/api/ad_list_items/delete", { id })
      .then((res) => {
        getDataItems(paging.pageNumber, paging.perPage);
      })
      .catch((err) => errorMessage(err));
  }

  function AdItemFormHander(items, adListId) {
    return (
      <Form
        name="adItem"
        autoComplete="false"
        initialValues={edit ? edit : ""}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={(e) => submitItemHandler(e, adListId)}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: false,
              message: "Name  is required",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="bannerType"
          label="Banner Type"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select onChange={(type) => setBannerTypeValue(type)}>
            {ADS_ENUM_BANNER.map((type) => (
              <Select.Option key={type}>{type}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        {bannerTypeValue === "htmlCode" ? (
          <Form.Item
            name="htmlCode"
            label="Html Code"
            rules={[
              {
                required: true,
                message: "Html code  is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          <>
            <Form.Item
              name="webLink"
              label="Web Link"
              rules={[
                {
                  required: true,
                  message: "Web Link  is required",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="titleId"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Title required",
                },
              ]}
            >
              <Select
                onSearch={debounce((value) => {
                  getTitleList(value);
                }, 1500)}
                showSearch
                filterOption={false}
              >
                {titleLoading && (
                  <Select.Option disabled value="0">
                    <Row justify="center" gutter={[16, 16]}>
                      <Col>
                        <Spin loading />
                      </Col>
                    </Row>
                  </Select.Option>
                )}
                {titleList.map((title) => (
                  <Select.Option key={title.value} value={title.value}>
                    {title.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="imageUrl"
              label="Image Url"
              rules={[
                {
                  required: true,
                  message: "ImageURL  is required",
                },
              ]}
            >
              <Row gutter={8}>
                <Col flex="auto">
                  <Input />
                </Col>
                <Col>
                  <Button type="primary" htmlType="submit" onClick={showModal}>
                    Upload
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Modal
              title="Upload Image"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div style={{ height: 300 }}>
                <ImageUpload />
              </div>
            </Modal>
          </>
        )}

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

  const seqColumn = [
    {
      title: "New Sequence",
      dataIndex: "sequence",
      align: "center",
    },
    {
      title: "Old Sequence",
      dataIndex: "sequence",
      align: "center",
    },

    {
      title: "Name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Id",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "Order",
      dataIndex: "adsLocation",
      align: "end",
      render: (b, a, originalIndex) => (
        <Form
        // onFinish={(values) =>
        //   sequenceFinish(values.number - 1, originalIndex)
        // }
        >
          <Form.Item name="number">
            <Space.Compact style={{ width: "120px" }}>
              <Input type="number" />
              <Button type="primary" htmlType="submit">
                OK
              </Button>
            </Space.Compact>
          </Form.Item>
        </Form>
      ),
    },
  ];

  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <=
      e.currentTarget.clientHeight + 50
    ) {
      loadMoreData();
    }
  };

  return (
    <>
      <Row align="end">
        <Col>
          <Button
            type="primary"
            onClick={() => openForm()}
            disabled={loading}
            loading={loading}
            style={{ marginBottom: "15px" }}
          >
            Create
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => openSeqDrawer()}
            disabled={loading}
            loading={loading}
            style={{ marginLeft: "10px" }}
          >
            Sequence Order
          </Button>
        </Col>
      </Row>
      {data?.length > 0 ? (
        <Row
          gutter={[16, 16]}
          onScroll={onScroll}
          style={{ overflowY: "scroll", height: "800px" }}
        >
          {data.map((item) => {
            let source;
            switch (true) {
              case item.bannerType === "image":
                source = item.imageUrl;
                break;
              case item.bannerType === "htmlCode":
                source = item.htmlCode;
                break;
              default:
                source = item.webLink;
                break;
            }
            return (
              <Col span={6} key={item.id}>
                <Card
                  title={item.name}
                  cover={
                    <div style={{ position: "relative" }}>
                      <div style={{ height: "150px" }}>
                        {item.bannerType === "htmlCode" ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.htmlCode
                                .replace("'<", "<")
                                .replace(
                                  "/>'",
                                  "style='height:150px;width:100%;object_fit:contain;opacity:0.6;' />"
                                ),
                            }}
                          />
                        ) : (
                          <img
                            style={{
                              height: "150px",
                              objectFit: "cover",
                              width: "100%",
                              opacity: "0.6",
                            }}
                            alt="image"
                            src={source}
                          />
                        )}
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          top: 6,
                          left: -10,
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Row justify="end">
                          <Col>
                            <Button
                              type="primary"
                              onClick={() => openForm(item)}
                              icon={<EditOutlined />}
                              style={{ marginRight: "10px" }}
                            />
                            <Popconfirm
                              title="Delete User"
                              description={`Are you sure Delete AdList?`}
                              okText="Delete"
                              cancelText="Cancel"
                              onConfirm={() => deleteAdItem(item.id)}
                            >
                              <Button
                                type="primary"
                                danger
                                icon={<DeleteOutlined />}
                              />
                            </Popconfirm>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  }
                >
                  <Row justify="space-between" align="bottom">
                    <Col>
                      <Row align="bottom">
                        <Col>
                          <Tag color="magenta">Click:{item.clickCount}</Tag>
                        </Col>
                        <Col>
                          <Tag color="lime" style={{ margin: "0 5px" }}>
                            View:{item.viewCount}
                          </Tag>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Popconfirm
                        title="Delete User"
                        description={`Are you sure ${
                          item.status ? "Unpublish" : "Publish"
                        } AdList?`}
                        okText="Delete"
                        cancelText="Cancel"
                        onConfirm={() => publishAdItem(item.id, item.status)}
                      >
                        <Button
                          style={{
                            background: item.status ? "#2bba3e" : "#cf3e43",
                            color: "white",
                            marginTop: "10px",
                          }}
                          icon={
                            item.status ? <ToTopOutlined /> : <StopOutlined />
                          }
                        >
                          {item.status ? "Published" : "Unpublished"}
                        </Button>
                      </Popconfirm>
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          })}
          {loading && <Spin loading={loading}></Spin>}
        </Row>
      ) : (
        <Typography>There is No Ad Item</Typography>
      )}

      <Drawer
        open={showDrawer}
        title={edit ? `Edit Item (${edit?.name})` : "Create New Item"}
        onClose={() => closeForm()}
        placement="right"
        width={700}
        destroyOnClose
        style={{
          overflow: "hidden",
        }}
      >
        {AdItemFormHander()}
      </Drawer>
      <Drawer
        open={showSeqDrawer}
        width={700}
        destroyOnClose
        placement="right"
        title="Sequence Order"
        onClose={() => setShowSeqDrawer(false)}
      >
        <Table
          columns={seqColumn}
          rowKey="key"
          dataSource={seqData}
          loading={loading}
          pagination={false}
        ></Table>
      </Drawer>
    </>
  );
}
