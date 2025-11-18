"use client";

import NotificationForm from "@/components/Notification/NotificationServiceForm";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { nextQueryHandler } from "@/lib/globalFunctions";
import { QUERY_NOTIFICATION_CONST } from "@/lib/queryConst";
import SearchHandler from "@/lib/searchHandler";
import { errorMessage } from "@/lib/uiFunctions";
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Table,
  Typography,
  message,
} from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";
import { debounce } from "lodash";
import { useState } from "react";
const { Text } = Typography;

export default function Notification({ permissions, data }) {
  const [loading, setLoading] = useState(false);

  const [notificationData, setNotificationData] = useState(data.value);
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: data.total,
  });

  const [editNoti, setEditNoti] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);

  const [filter, setFilter] = useState(QUERY_NOTIFICATION_CONST.filter);
  const [order, setOrder] = useState(QUERY_NOTIFICATION_CONST.order);

  function openDrawer(createData) {
    if (createData) {
      setEditNoti(createData);
      setShowDrawer(true);
    } else {
      setShowDrawer(true);
    }
  }
  function closeDrawer() {
    //console.log("drawerClose");
    setShowDrawer(false);
  }

  async function getNotificationList(
    pageNumber,
    perPage,
    updatedFilter = filter
  ) {
    setLoading(true);
    axios
      .get(
        `/api/notification/get_list?${await apiQueryHandler(
          QUERY_NOTIFICATION_CONST,
          updatedFilter,
          order,
          QUERY_NOTIFICATION_CONST.fields,
          "normal",
          {
            pageNumber,
            perPage,
          }
        )}`
      )
      .then(({ data: result }) => {
        if (result.value.length < 1) {
          message.warning("No Found");
        }
        setPaging({
          pageNumber,
          perPage,
          total: result["@odata.count"],
        });
        setNotificationData(result.value);
      })
      .catch((error) => {
        errorMessage(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function submitHandler(data) {
    //console.log(data)
    setLoading(true);
    axios
      .post("/api/notification/create", {
        name: data.name,
        notiTitle: data.notiTitle,
        notiDescription: data.notiDescription,
        topicId: data.topicId,
        image: data.image,
        referencedId: data.referencedId,
        referenceUrl: data.referenceUrl,
        referenceType: data.referenceType,
        sendDate: data.sendDate,
      })
      //console.log(data)
      .then((res) => {
        closeDrawer();
        getNotificationList(paging.pageNumber, paging.perPage, filter);
      })
      .catch((error) => {
        errorMessage(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const [topicLoading, setTopicLoading] = useState(false);
  const [topicIdList, setTopicIdList] = useState([]);

  const [isSchdule, setIsSchedule] = useState(false);
  const [referenceType, setReferenceType] = useState("default");
  const handleReferenceTypeChange = (value) => {
    setReferenceType(value);
  };
  const handleIsScheduleChange = (value) => {
    setIsSchedule(value === "true");
  };

  function getTopicList(name) {
    setTopicLoading(true);
    axios
      .get(
        `/api/notification/get_noti_tid?name=${name}&pageNumber=1&perpage=15`
      )
      .then(({ data }) => {
        //console.log(data.value, "hhh");
        const topics = data.value.map((topic) => ({
          label: topic.topicName,
          value: topic.id,
        }));
        //console.log(topics, "kkk");
        setTopicIdList([...topics]);
      })
      .catch((err) => {
        console.log(err);
        // errorMessage(err);
      })
      .finally(() => setTopicLoading(false));
  }
  //console.log(topicIdList,"lll")
  function NotiCreateHandler() {
    return (
      <NotificationForm
        loading={loading}
        getTopicList={getTopicList}
        submitHandler={submitHandler}
        topicLoading={topicLoading}
        topicIdList={topicIdList}
        handleReferenceTypeChange={handleReferenceTypeChange}
        referenceType={referenceType}
        handleIsScheduleChange={handleIsScheduleChange}
        debounce={debounce}
        isSchdule={isSchdule}
      />
    );
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Noti Title",
      dataIndex: "notiTitle",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "image",
      align: "center",
      render: (url) => <Avatar src={url} />,
    },
    {
      title: "ReferenceUrl",
      dataIndex: "referenceUrl",
      align: "center",
    },
    {
      title: "Reference Type",
      dataIndex: "referenceType",
      align: "center",
    },
    {
      title: "Topic Id",
      dataIndex: ["topic", "topicName"],
      align: "center",
    },
  ];

  return (
    <Row
      gutter={[16, 16]}
      style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}
    >
      <Col span={24}>
        <Row justify="space-between" align="center" gutter={16}>
          <Col span={24} flex="auto">
            <SearchHandler
              filter={filter}
              setFilter={setFilter}
              order={order}
              setOrder={setOrder}
              pagination={paging}
              apiHandler={getNotificationList}
            />
          </Col>
          <Col>
            <Button
              type="primary"
              disabled={!permissions.includes("NOTIFICATION_READ")}
              onClick={() => openDrawer()}
            >
              Send Notification
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Table
          loading={loading}
          dataSource={notificationData}
          columns={columns}
          rowKey={(record) => record.id}
          pagination={{
            total: paging.total,
            defaultCurrent: 1,
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50],
            onChange: (pageNumber, perPage) => {
              getNotificationList(pageNumber, perPage, filter);
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
                        <Col span={8}>NotiDescription</Col>
                        <Col>
                          <Text span={16}>: {record.notiDescription}</Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>Send Date</Col>
                        <Col>
                          <Text span={16}>: {record.sendDate}</Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>Reference Id</Col>
                        <Col>
                          <Text span={16}>: {record.referencedId}</Text>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card>
                      {/* <Row>
                        <Col span={8}> Reference Id</Col>
                        <Col>
                          <Text span={16}>: {record.referencedId}</Text>
                        </Col>
                      </Row> */}
                      <Row>
                        <Col span={8}>Created At</Col>
                        <Col>
                          <Text span={16}>: {record.createdAt}</Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>Created By</Col>
                        <Col>
                          <Text span={16}>: {record.createdBy}</Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>Is Done</Col>
                        <Col>
                          <Text span={16}>
                            : {record.isDone ? "true" : "false"}
                          </Text>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              );
            },
          }}
        ></Table>
      </Col>
      <Drawer
        title="Notification"
        placement="right"
        width={700}
        open={showDrawer}
        onClose={() => closeDrawer()}
        destroyOnClose="false"
      >
        {NotiCreateHandler()}
      </Drawer>
    </Row>
  );
}
