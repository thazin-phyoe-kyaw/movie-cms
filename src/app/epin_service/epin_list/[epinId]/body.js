"use client";

import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_EPINS_CONST } from "@/lib/queryConst";
import { errorMessage } from "@/lib/uiFunctions";
import { Col, Row, Table, Tag, message } from "antd";
import axios from "axios";
import { useState } from "react";
import EpinSearch from "./epinSearch";

export default function EpinListBody({ permissions, epinGetData , updateFilter }) {
  const [loading, setLoading] = useState(false);
  const [epinData, setEpinData] = useState(epinGetData.value);
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: epinGetData.total,
  });
  const [filter, setFilter] = useState(updateFilter);
  const [order, setOrder] = useState(QUERY_EPINS_CONST.order);

  const columns = [
    {
      title: "#",
      align: "left",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Serial No",
      dataIndex: "serialNo",
      key: "serialNo",
    },
    {
      title: "Batch No",
      dataIndex: ["EpinGenerationJob", "batchNo"],
      key: "batchNo",
    },
    {
      title: "Prefix",
      dataIndex: ["EpinGenerationJob", "prefix"],
      key: "prefix",
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        const date = new Date(createdAt);
        const formattedDate = `${("0" + date.getDate()).slice(-2)}-${(
          "0" +
          (date.getMonth() + 1)
        ).slice(-2)}-${date.getFullYear()} ${("0" + date.getHours()).slice(
          -2
        )}:${("0" + date.getMinutes()).slice(-2)}:${(
          "0" + date.getSeconds()
        ).slice(-2)}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "expired Date",
      dataIndex: "expiredDate",
      key: "expiredDate",
      render: (expiredDate) => {
        const date = new Date(expiredDate);
        const formattedDate = `${("0" + date.getDate()).slice(-2)}-${(
          "0" +
          (date.getMonth() + 1)
        ).slice(-2)}-${date.getFullYear()} ${("0" + date.getHours()).slice(
          -2
        )}:${("0" + date.getMinutes()).slice(-2)}:${(
          "0" + date.getSeconds()
        ).slice(-2)}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (status) => {
        let color = "";
        switch (status) {
          case "active":
            color = "green";
            break;
          case "inactive":
            color = "red";
            break;
          // Add more cases for other status values if needed
          default:
            color = "blue";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  async function getEpinList(pageNumber, perPage, newFilter = filter) {
    setLoading(true);
    let query = await apiQueryHandler(
      QUERY_EPINS_CONST,
      newFilter,
      order,
      QUERY_EPINS_CONST.fields,
      "normal",
      { pageNumber, perPage }
    );
    axios
      .get(`/api/epin/filter_epin?${query}`)
      .then(({ data }) => {
        // console.log(data);
        if (data.value.length < 1) {
          message.warning("Not found");
        }
        setPaging({
          pageNumber,
          perPage,
          total: data["@odata.count"],
        });
        setEpinData(data.value);
      })
      .catch((error) => {
        errorMessage(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row justify="space-between" align="center" gutter={16}>
            <Col span={24} flex="auto">
              <EpinSearch
                data={epinData}
                filter={filter}
                setFilter={setFilter}
                apiHandler={getEpinList}
                pagination={paging}
              />
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
            dataSource={epinData}
            columns={columns}
            loading={loading}
            pagination={{
              total: paging.total,
              defaultCurrent: 1,
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: [10, 20, 50],
              onChange: (pageNumber, perPage) => {
                getEpinList(pageNumber, perPage, filter);
              },
            }}
          ></Table>
        </Col>
      </Row>
    </div>
  );
}
