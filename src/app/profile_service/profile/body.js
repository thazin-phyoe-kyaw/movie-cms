"use client";
import React from "react";
import { useState } from "react";
import {
  Form,
  Table,
  Input,
  Select,
  Tag,
  Popconfirm,
  Avatar,
  Button,
  Row,
  Col,
  Typography,
  Card,
  Drawer,
  DatePicker,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  errorResponse,
  getBirthDate,
  getUiDate,
  nextQueryHandler,
} from "@/lib/globalFunctions";
import { errorMessage, notFoundErrorMessage } from "@/lib/uiFunctions";
import axios from "axios";
import Favourite from "./favourite";
import UserDevice from "./userDevice";
import Like from "./like";
import Downloads from "./downloads";
import UserShares from "./userShare";
import * as moment from "moment";
import dayjs from "dayjs";
import ProfileServiceForm from "@/components/Profile/ProfileServiceForm";
import { QUERY_PROFILE_CONST } from "@/lib/queryConst";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import SearchHandler from "@/lib/searchHandler";

const { Option } = Select;
const { Text } = Typography;

export default function ProfileService({ permissions, data }) {
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: data.total,
  });
  const [profiles, setProfiles] = useState(data.value);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(QUERY_PROFILE_CONST.filter);
  const [order, setOrder] = useState(QUERY_PROFILE_CONST.order);

  // for edit
  const [showDrawer, setShowDrawer] = useState(false);
  const [edit, setEdit] = useState(false);
  function openEditDrawer(editdata) {
    if (editdata) {
      setEdit(editdata);
    }
    setShowDrawer(true);
  }

  function closeEditDrawer() {
    setShowDrawer(false);
    setEdit(false);
  }

  // for detail
  const [detailDrawer, setDetailDrawer] = useState(false);
  const [detailPagination, setDetailPagination] = useState({
    pageNumber: 1,
    perPage: 10,
    total: 0,
  });

  const [detail, setDetail] = useState({
    type: "",
    total: 0,
    data: [],
    userId: "",
  });

  function closeDetail() {
    setDetailDrawer(false);
    setDetailPagination({ pageNumber: 1, perPage: 10, total: 0 });
    setDetail({ type: "", data: [] });
  }

  function showDetail(type, userId, data, total) {
    setDetail({
      type,
      total,
      data,
      userId,
    });
    setDetailDrawer(true);
  }

  function closeDetail() {
    setDetailDrawer(false);
    setDetail({
      type: "",
      total: 0,
      data: [],
      userId: "",
    });
  }

  function deleteUser(id) {
    setLoading(true);
    axios
      .post("/api/movie_user_profile/delete", { id })
      .then(() => {
        getDataList(paging.pageNumber, paging.perPage, filter);
      })
      .catch((err) => errorMessage(err));
  }

  function bannedUser(id, status) {
    setLoading(true);
    axios
      .post("/api/movie_user_profile/banrecover", { id, status })
      .then(() => {
        getDataList(paging.pageNumber, paging.perPage, filter);
      })
      .catch((err) => errorMessage(err));
  }
  //console.log(data.value);

  function submitHandler(editdata) {
    //console.log(editdata)
    setLoading(true);
    axios
      .post(`/api/movie_user_profile/update`, {
        id: editdata.id,
        name: editdata.name,
        phoneNumber: editdata.phoneNumber,
        imageUrl: editdata.imageUrl,
        gender: editdata.gender,
        dateOfBirth: editdata.dateOfBirth,
      }) // Use the provided "id" for updating
      .then(() => {
        closeEditDrawer();
        getDataList(paging.pageNumber, paging.perPage, filter);
      })
      .catch((error) => {
        errorMessage(error);
        setLoading(false);
      });
  }
  async function getDataList(pageNumber, perPage, updatedFilter = filter) {
    setLoading(true);
    axios
      .get(
        `/api/movie_user_profile/get_list?${await apiQueryHandler(
          QUERY_PROFILE_CONST,
          updatedFilter,
          QUERY_PROFILE_CONST.order,
          QUERY_PROFILE_CONST.fields,
          "normal",
          {
            pageNumber,
            perPage,
          }
        )}`
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
        setProfiles(result.value);
      })
      .catch((error) => {
        // romocode / get_list;
        errorMessage({ response: { error } });
        // notFoundErrorMessage(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function editUser() {
    return (
      <ProfileServiceForm
        loading={loading}
        edit={edit}
        submitHandler={submitHandler}
      />
    );
  }

  const columns = [
    {
      title: "",
      dataIndex: "imageUrl",
      align: "center",
      render: (url) => <Avatar src={url} />,
    },
    {
      title: "Number",
      dataIndex: "number",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
      align: "center",
      render: (phoneNumber) => {
        return phoneNumber === "000-000-000" ? "unknown" : phoneNumber;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (status) => {
        switch (true) {
          case status === "enable":
            return <Tag color="green">Enable</Tag>;
          case status === "delete":
            return <Tag color="orange">Deleted by User</Tag>;
          case status === "deleteByAdmin":
            return <Tag color="magenta">Deleted by admin</Tag>;
          case status === "disable":
            return <Tag color="blue">Banned</Tag>;
          default:
            return "";
        }
      },
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <Row justify="end" gutter={8}>
          <Col>
            <Popconfirm
              title="Banned User"
              description="Make sure Ban or recover"
              onConfirm={() => {
                bannedUser(
                  record.id,
                  record.status === "enable" ? "disable" : "enable"
                );
              }}
              okText="Ban"
              cancelText="Recover"
            >
              <Button danger>Ban</Button>{" "}
            </Popconfirm>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<EditOutlined />}
              permission={"PROFILE_SERVICE_PROFILE_UPDATE"}
              onClick={() => openEditDrawer(record)}
            />
          </Col>
          <Col>
            <Popconfirm
              title="Delete User"
              description="Are u sure delete this user. delete user can't change future"
              onConfirm={() => {
                deleteUser(record.id);
                record.status = "deleteByAdmin";
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Col>
        </Row>
      ),
    },
  ];
  function showDetailBody() {
    switch (true) {
      case detail.type === "Favourite":
        return <Favourite data={detail} closeDrawer={closeDetail} />;
      case detail.type === "Like":
        return <Like data={detail} closeDrawer={closeDetail} />;
      case detail.type === "UserDevice":
        return <UserDevice data={detail} closeDrawer={closeDetail} />;
      case detail.type === "Download":
        return <Downloads data={detail} closeDrawer={closeDetail} />;
      case detail.type === "UserShares":
        return <UserShares data={detail} closeDrawer={closeDetail} />;
      default:
        return "";
    }
  }
  return (
    <Row gutter={[16, 16]}>
      <Col span={20} flex="auto">
        <SearchHandler
          filter={filter}
          setFilter={setFilter}
          order={order}
          setOrder={setOrder}
          pagination={paging}
          apiHandler={getDataList}
        />
      </Col>
      <Col span={24}>
        <Table
          loading={loading}
          dataSource={profiles}
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
              return (
                <Row gutter={24}>
                  <Col span={12}>
                    <Card>
                      <Row>
                        <Col span={8}>Login type</Col>
                        <Col>
                          <Text span={16}>: {record.type}</Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>Firebase User Id</Col>
                        <Col span={16}>
                          : <Text copyable>{record.firebaseUserId}</Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>Last Login</Col>
                        <Col span={16}>
                          : <Text>{getUiDate(record.lastLogin)}</Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>Gender</Col>
                        <Col span={16}>
                          : <Text>{record.gender}</Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>Date Of Birth</Col>
                        <Col span={16}>
                          : <Text>{record.dateOfBirth}</Text>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card>
                      <Row gutter={[8, 8]}>
                        <Col span={8}>Devices</Col>
                        <Col span={16}>
                          <Row justify="space-between">
                            <Col>
                              <Text>
                                : {record["UserDevices@odata.count"]}{" "}
                              </Text>
                            </Col>
                            <Col>
                              <Button
                                size="small"
                                disabled={
                                  record["UserDevices@odata.count"] === 0
                                }
                                onClick={() =>
                                  showDetail(
                                    "UserDevice",
                                    record.id,
                                    record.UserDevices,
                                    record["UserDevices@odata.count"]
                                  )
                                }
                              >
                                Show Detail
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={8}>Favourites</Col>
                        <Col span={16}>
                          <Row justify="space-between">
                            <Col>
                              <Text>: {record["Favourites@odata.count"]} </Text>
                            </Col>
                            <Col>
                              <Button
                                size="small"
                                disabled={
                                  record["Favourites@odata.count"] === 0
                                }
                                onClick={() =>
                                  showDetail(
                                    "Favourite",
                                    record.id,
                                    record.Favourites,
                                    record["Favourites@odata.count"]
                                  )
                                }
                              >
                                Show Detail
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={8}>Likes</Col>
                        <Col span={16}>
                          <Row justify="space-between">
                            <Col>
                              <Text>: {record["Likes@odata.count"]} </Text>
                            </Col>
                            <Col>
                              <Button
                                size="small"
                                disabled={record["Likes@odata.count"] === 0}
                                onClick={() =>
                                  showDetail(
                                    "Like",
                                    record.id,
                                    record.Likes,
                                    record["Likes@odata.count"]
                                  )
                                }
                              >
                                Show Detail
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={8}>Downloads</Col>
                        <Col span={16}>
                          <Row justify="space-between">
                            <Col>
                              <Text>: {record["Downloads@odata.count"]} </Text>
                            </Col>
                            <Col>
                              <Button
                                size="small"
                                disabled={record["Downloads@odata.count"] === 0}
                                onClick={() =>
                                  showDetail(
                                    "Download",
                                    record.id,
                                    record.Downloads,
                                    record["Downloads@odata.count"]
                                  )
                                }
                              >
                                Show Detail
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={8}>UserShares</Col>
                        <Col span={16}>
                          <Row justify="space-between">
                            <Col>
                              <Text>: {record["UserShares@odata.count"]} </Text>
                            </Col>
                            <Col>
                              <Button
                                size="small"
                                disabled={
                                  record["UserShares@odata.count"] === 0
                                }
                                onClick={() =>
                                  showDetail(
                                    "UserShare",
                                    record.id,
                                    record.UserShares,
                                    record["UserShares@odata.count"]
                                  )
                                }
                              >
                                Show Detail
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              );
            },
          }}
        />
        <Drawer
          name="Detail view"
          title={detail.type ? detail.type : "Edit"}
          placement="right"
          open={detailDrawer}
          width={detail.type === "UserDevice" ? 1000 : 700}
          onClose={() => closeDetail()}
          destroyOnClose
        >
          {showDetailBody()}
        </Drawer>
        <Drawer
          title="Edit"
          placement="right"
          open={showDrawer}
          width={700}
          onClose={() => closeEditDrawer()}
          destroyOnClose
        >
          {editUser()}
        </Drawer>
      </Col>
    </Row>
  );
}
