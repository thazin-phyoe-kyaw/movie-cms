"use client";
import EpinPackageForm from "@/components/EpinGenerationJob/EpinPackage";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_EPIN_PACKAGE_CONST } from "@/lib/queryConst";
import SearchHandler from "@/lib/searchHandler";
import { errorMessage } from "@/lib/uiFunctions";
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Drawer,
  Row,
  Table,
  Typography,
  message,
} from "antd";
import axios from "axios";
import React, { useState } from "react";
const { Text } = Typography;

export default function EpinPackage({ permissions, data }) {
  const [loading, setLoading] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [epinPackgaeData, setEpinPackageData] = useState(data.value);
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: data.total,
  });
  const [editpackage, setEditPackage] = useState({});

  const [filter, setFilter] = useState(QUERY_EPIN_PACKAGE_CONST.filter);
  const [order, setOrder] = useState(QUERY_EPIN_PACKAGE_CONST.order);

  function openDrawer(data) {
    if (data) {
      setEditPackage(data);
      setShowDrawer(true);
    } else {
      setShowDrawer(true);
    }
  }
  function closeDrawer() {
    setShowDrawer(false);
    setEditPackage(false);
  }

  async function getEpinPackageList(
    pageNumber,
    perPage,
    updatedFilter = filter
  ) {
    setLoading(true);
    axios
      .get(
        `/api/epinPackage/get_list?${await apiQueryHandler(
          QUERY_EPIN_PACKAGE_CONST,
          updatedFilter,
          order,
          QUERY_EPIN_PACKAGE_CONST.fields,
          "no_child",
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

        setEpinPackageData(result.value);
      })
      .catch((error) => {
        errorMessage(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function submitHandler(edit) {
    setLoading(true);
    axios
      .post("/api/epinPackage/update", {
        id: edit.id,
        name: edit.name,
        description: edit.description,
      })
      .then((res) => getEpinPackageList(paging.pageNumber, paging.perPage))
      .catch((error) => {
        errorMessage(error);
      })
      .finally(() => {
        closeDrawer();
        setLoading(false);
      });
  }

  function EpinPackageHandler() {
    return (
      <EpinPackageForm
        loading={loading}
        editpackage={editpackage}
        submitHandler={submitHandler}
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
      title: "Description",
      dataIndex: "description",
      align: "center",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      align: "center",
    },
    {
      title: "Expired Duration",
      dataIndex: "expiredDuration",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "center",
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <Row justify="end" gutter={8}>
          <Col>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => openDrawer(record)}
            />
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Row
      gutter={[16, 16]}
      style={{ maxHeight: "calc(100vh - 96px)", overflowY: "auto" }}
    >
      <Col span={24}>
        <Row justify="space-between" align="center" gutter={24}>
          <Col span={24} flex="auto">
            <SearchHandler
              filter={filter}
              setFilter={setFilter}
              order={order}
              setOrder={setOrder}
              pagination={paging}
              apiHandler={getEpinPackageList}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Table
          loading={loading}
          columns={columns}
          dataSource={epinPackgaeData}
          rowKey={(record) => record.id}
          pagination={{
            total: paging.total,
            defaultCurrent: 1,
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50],
            onChange: (pageNumber, perPage) => {
              getEpinPackageList(pageNumber, perPage, filter);
            },
          }}
        ></Table>
      </Col>
      <Drawer
        title="Edit"
        placement="right"
        width={700}
        open={showDrawer}
        onClose={() => closeDrawer()}
        destroyOnClose
      >
        {EpinPackageHandler()}
      </Drawer>
    </Row>
  );
}
