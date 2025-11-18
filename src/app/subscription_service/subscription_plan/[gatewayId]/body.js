"use client";
import React from "react";
import { useState } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  Space,
  Button,
  Drawer,
  Form,
  Input,
  Typography,
  Select,
  Tag,
} from "antd";
import { SubscriptionServiceForm } from "@/components/Subscription/Form";
const { Text } = Typography;
import axios from "axios";
import { EditOutlined } from "@ant-design/icons";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_SUBSCRIPTION_PLAN_CONST } from "@/lib/queryConst";

export default function PlanListBody({ permission, preData, gateWayId }) {
  const [plans, setPlans] = useState(preData?.value?.value);
  const [editPlans, setEditPlans] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPlansDrawer, setShowPlansDrawer] = useState(false);

  function openAdListDrawer(data) {
    if (data) {
      setEditPlans(data);
    }
    setShowPlansDrawer(true);
  }
  function closeAdList() {
    setShowPlansDrawer(false);
    setEditPlans(false);
  }

  function submitHandler(data) {
    setLoading(true);
    if (editPlans) {
      axios
        .post("/api/subscription_plan/update", {
          id: data.id,
          ...data,
        })

        .then((res) => {
          closeAdList();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          closeAdList();
          getDataList();
        });
    } else {
      axios
        .post("/api/subscription_plan/create", data)
        .then((res) => {
          getDataList();
          closeAdList();
        })
        .catch((err) => console.log(err))
        .finally(closeAdList());
    }
  }

  function formHandler() {
    return (
      <SubscriptionServiceForm
        loading={loading}
        editPlans={editPlans}
        submitHandler={submitHandler}
        data={gateWayId}
      />
    );
  }

  // console.log(preData?.value?.value[0], gateWayId);

  let filter = QUERY_SUBSCRIPTION_PLAN_CONST.filter;
  let updateFilter = {
    ...filter,
    gateWays: { ...filter.gateWays, value: gateWayId },
  };

  async function getDataList() {
    setLoading(true);
    axios
      .get(
        `/api/subscription_plan/get_list?${await apiQueryHandler(
          QUERY_SUBSCRIPTION_PLAN_CONST,
          updateFilter,
          QUERY_SUBSCRIPTION_PLAN_CONST.order,
          QUERY_SUBSCRIPTION_PLAN_CONST.fields,
          "normal"
          // {
          //   pageNumber,
          //   perPage,
          // }
        )}`
      )
      .then(({ data: result }) => {
        if (result.value && result.value.length !== 0) {
          setPlans([...result.value]);
        }
      })
      .catch((error) => {
        errorMessage(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const columns = [
    {
      title: "Title (Eng)",
      dataIndex: "titleEng",
    },
    {
      title: "GateWay Name",
      dataIndex: "",

      render: (_, record) => {
        let color = "";
        switch (record.PaymentGateway.platform) {
          case "ATOM":
            color = "blue";
            break;
          case "Kpay":
            color = "blue";
            break;
          case "Wave":
            color = "yellow";
            break;
          case "Mahar":
            color = "orange";
            break;
          case "Oredoo":
            color = "red";
            break;
          case "MPT":
            color = "yellow";
            break;
          default:
            color = "purple";
        }
        return (
          <Col>
            <Tag color={color}>{record.PaymentGateway.platform}</Tag>
          </Col>
        );
      },
    },
    {
      title: "PlanID",
      dataIndex: "planId",
    },

    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Price",
      dataIndex: "costDisplay",
      render: (text, record) => (
        <span>
          {record.costDisplay} {record.currency}
        </span>
      ),
    },
    // {
    //   title: "Description (Mm)",
    //   dataIndex: "descriptionMm",
    // },
    // {
    //   title: "Description (Eng)",
    //   dataIndex: "descriptionEng",
    // },
    {
      title: "Active",
      dataIndex: "active",
      render: (active) => {
        if (active === true) {
          return (
            <Button
              type="primary"
              permission={"SUBSCRIPTION_PAYMENT_PLAN_UPDATE"}
              ghost
              style={{
                backgroundColor: "#2bba3e",
                borderColor: "#2bba3e",
                color: "white",
                width: "100px",
              }}
            >
              Active
            </Button>
          );
        } else if (active === false) {
          return (
            <Button
              type="primary"
              ghost
              style={{
                backgroundColor: "#cf3e43",
                borderColor: "#cf3e43",
                color: "white",
                width: "100px",
              }}
            >
              InActive
            </Button>
          );
        } else {
          return null;
        }
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => openAdListDrawer(record)}
            />
          </Space>
        );
      },
    },
  ];

  function expandRowHandler(record) {
    // const foundGateway = gateWay.find((gate) => gate.id === record.gateways);

    return (
      <>
        <Row gutter={12}>
          <Col span={12}>
            <Card
              style={{ width: "100%", margin: 12 }}
              title="Description (MY)"
              size="small"
            >
              <div style={{ padding: "12px" }}>
                <Text>{record.descriptionMm}</Text>
              </div>
            </Card>
          </Col>

          <Col span={12}>
            <Card
              style={{ width: "100%", margin: 12 }}
              title="Description (Eng)"
              size="small"
            >
              <div style={{ padding: "12px" }}>
                <Text>{record.descriptionEng}</Text>
              </div>
            </Card>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row justify="end">
          <Col>
            <Button type="primary" onClick={() => openAdListDrawer("")}>
              Create New
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
          dataSource={plans}
          columns={columns}
          loading={loading}
          expandable={{
            rowExpandable: (record) => true,
            expandedRowRender: (record) => expandRowHandler(record), // This line
          }}
          pagination = {false}
          // pagination={{
          //   total: paging.total,
          //   defaultCurrent: 1,
          //   defaultPageSize: 10,
          //   showSizeChanger: true,
          //   pageSizeOptions: [10, 20, 50],
          //   onChange: (pageNumber, perPage) => {
          //     getDataList(pageNumber, perPage);
          //   },
          // }}
        />
      </Col>
      <Drawer
        open={showPlansDrawer}
        onClose={() => closeAdList()}
        destroyOnClose="true"
        width={700}
        title={editPlans ? "Edit Platform list" : "Create Platform List"}
      >
        {formHandler()}
      </Drawer>
    </Row>
  );
}
