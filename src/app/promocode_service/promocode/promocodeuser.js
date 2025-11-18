"use client";
import { nextQueryHandler } from "@/lib/globalFunctions";
import { errorMessage } from "@/lib/uiFunctions";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Popconfirm, Row, Table } from "antd";
import axios from "axios";
import { useState } from "react";

export default function PromocodeUser({ data, closeDrawer }) {
  const [list, setList] = useState(data.PromoCodeUsers);
  const [loading, setLoading] = useState(false);
  const [promcodeusers, setPromcodeusers] = useState(data.value);
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: data["PromoCodeUsers@odata.count"],
  });

  const [filter, setFilter] = useState({
    deleteAt: { value: true, type: "null" },
  });
  function getPromoUserData(pageNumber, perPage, newFilter) {
    setLoading(true);
    axios
      .get(
        `/api/promocodeusers/get_list${nextQueryHandler(newFilter, {
          pageNumber,
          perPage,
        })}`
      )
      .then(({ data: result }) => {
        setPaging({
          pageNumber,
          perPage,
          total: result["@odata.count"],
        });
        setPromcodeusers(result.value);
      })
      .catch((error) => {
        // console.log(error);
        errorMessage(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function deletePromoUser(id, promoId, usedCount) {
    setLoading(true);
    axios
      .post("/api/promocodeusers/delete", { id, promoId, usedCount })
      .then(() => {
        getPromoUserData(paging.pageNumber, paging.perPage, filter);
      })
      .catch((err) => {
        errorMessage(err);
      });
  }
  const columns = [
    {
      title: "Name",
      dataIndex: ["user", "name"],
      align: "center",
    },
    {
      title: "PromoId",
      dataIndex: "promoId",
      align: "center",
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <Row justify="end" gutter={12}>
          <Col>
            <Popconfirm
              title="Delete User"
              description={`Are u sure delete this user?`}
              onConfirm={() =>
                deletePromoUser(record.id, record.promoId, data.usedCount)
              }
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
  return <Table columns={columns} dataSource={list} loading={loading}></Table>;
}
