"use client";
import React from "react";
import { useState } from "react";

import { Table, Row, Col, Button, Drawer, Popconfirm } from "antd";
import axios from "axios";
import { DollarOutlined } from "@ant-design/icons";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_SUBSCRIPTION_PAYMENT_GATEWAY_CONST } from "@/lib/queryConst";
import { errorMessage } from "@/lib/uiFunctions";
import SearchHandler from "@/lib/searchHandler";
import { useRouter } from "next/navigation";

export default function GateWayListBody({ permission, preData }) {
  const router = useRouter();

  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: preData?.count,
  });

  const [gateWays, setGateWays] = useState(preData?.value?.value);
  const [editGateWays, setEditGateWays] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showGateWaysDrawer, setShowGateWaysDrawer] = useState(false);

  const [filter, setFilter] = useState(
    QUERY_SUBSCRIPTION_PAYMENT_GATEWAY_CONST.filter
  );
  const [order, setOrder] = useState(
    QUERY_SUBSCRIPTION_PAYMENT_GATEWAY_CONST.order
  );

  function openAdListDrawer(data) {
    if (data) {
      setEditGateWays(data);
    }
    setShowGateWaysDrawer(true);
  }
  function closeAdList() {
    setShowGateWaysDrawer(false);
    setEditGateWays(false);
    getDataList(paging.pageNumber, paging.perPage);
  }
  async function getDataList(pageNumber, perPage, updatedFilter = filter) {
    setLoading(true);
    axios
      .get(
        `/api/payment_gateway/get_list?${await apiQueryHandler(
          QUERY_SUBSCRIPTION_PAYMENT_GATEWAY_CONST,
          updatedFilter,
          order,
          QUERY_SUBSCRIPTION_PAYMENT_GATEWAY_CONST.fields,
          "no_child",
          {
            pageNumber,
            perPage,
          }
        )}`
      )
      .then(({ data: result }) => {
        if (result.value.length < 1) {
          message.warning("No payment found");
        }
        setPaging({
          pageNumber,
          perPage,
          total: result["@odata.count"],
        });
        setGateWays(result.value);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const columns = [
    {
      title: "GateWay Image",
      dataIndex: "gateWayImage",
      render: (gateWayImage) => {
        return (
          <img
            src={gateWayImage}
            alt="gateway_image"
            width="80"
            height="50"
            style={{ objectFit: "contain" }}
          />
        );
      },
    },
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Platform",
      dataIndex: "platform",
    },
     
    // {
    //   title: "Package List",
    //   dataIndex: "package",
    //   render: (_, record) => {
    //     return (
    //       <Button
    //         type="primary"
    //         icon={<DollarOutlined />}
    //         key={record.id}
    //         title="View subscription plans"
    //         href="/subscription_service/subscription_plan"
    //       />
    //     );
    //   },
    // },

    {
      title: "Actions",
      dataIndex: "active",
      width: 220,

      render: (_, record) => (
        <Row justify={"space-between"}>
          <Col>
            <Popconfirm
              title={`Are you sure to ${
                record.active ? "InActive" : "IsActive"
              } this item?`}
              onConfirm={() => {
                setLoading(true);
                axios
                  .post("/api/payment_gateway/update", {
                    platform: record.platform,
                    active: !record.active,
                    id: record.id,
                    gateWayImage: editGateWays.gateWayImage,
                  })
                  .then((res) => getDataList(paging.pageNumber, paging.perPage))
                  .catch((err) => errorMessage(err))
                  .finally(() => setLoading(false));
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                permission={"SUBSCRIPTION_PAYMENT_GATEWAY_UPDATE"}
                ghost
                style={{
                  backgroundColor: record.active ? "#2bba3e" : "#cf3e43",
                  borderColor: record.active ? "#2bba3e" : "#cf3e43",
                  color: "white",
                  // width: "100px",
                }}
              >
                {record.active ? "Active" : "InActive"}
              </Button>
            </Popconfirm>
          </Col>

          <Col>
            <Button
              onClick={() =>
                router.push(
                  `/subscription_service/subscription_plan/${record.id}`
                )
              }
            >
              Package Lists
            </Button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} flex="auto">
        <SearchHandler
          filter={filter}
          setFilter={setFilter}
          order={order}
          setOrder={setOrder}
          pagination={paging}
          apiHandler={getDataList}
        />
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
          dataSource={gateWays}
          columns={columns}
          loading={loading}
          pagination={{
            total: paging.total,
            defaultCurrent: 1,
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50],
            onChange: (pageNumber, perPage) => {
              getDataList(pageNumber, perPage);
            },
          }}
        />
      </Col>
      <Drawer
        bodyStyle={{ paddingBottom: "100px" }}
        open={showGateWaysDrawer}
        onClose={() => closeAdList()}
        destroyOnClose="true"
        width={1000}
        title={editGateWays ? "Edit Platform list" : "Create Platform List"}
      ></Drawer>
    </Row>
  );
}
