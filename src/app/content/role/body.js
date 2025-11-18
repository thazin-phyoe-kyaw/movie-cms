"use client";

import RoleForm from "@/components/Content/RoleForm";
import { apiQueryHandler } from "@/lib/apiQueryHandler";

import { QUERY_CONTENT_ROLE_CONST } from "@/lib/queryConst";
import SearchHandler from "@/lib/searchHandler";
import { errorMessage } from "@/lib/uiFunctions";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Row,
  Space,
  Table,
  Col,
  Drawer,
  Popconfirm,
  Alert,
  Typography,
} from "antd";
import axios from "axios";

import { useState } from "react";
import { message } from "antd";
export default function RoleBody({ permissions, preData, userList }) {
  const [loading, setLoading] = useState(false);
  const [roleTitleID, setRoleTitleID] = useState(preData?.roleTitleID?.value);
  const roleandTitleID = roleTitleID?.map((item) => item.roleId);

  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: preData?.count,
  });

  const [data, setData] = useState(preData.value);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);

  const [filter, setFilter] = useState(QUERY_CONTENT_ROLE_CONST.filter);
  const [order, setOrder] = useState(QUERY_CONTENT_ROLE_CONST.order);

  const columns = [
    {
      title: "MM Name",
      dataIndex: "nameMm",
      key: "nameMm",
    },
    {
      title: "EN Name",
      dataIndex: "nameEn",
      key: "nameEn",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      render: (_, record) => {
        return <Typography>{record.createdBy.name}</Typography>;
      },
    },

    {
      title: "Actions",
      dataIndex: "actions",
      align: "right",
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="primary"
              icon={<EditOutlined />}
              disabled={!permissions.includes("CONTENT_ROlE_EDIT")}
              onClick={() => showDrawer(record)}
            />
            <Popconfirm
              title="Delete User"
              description={`Are you sure Delete?`}
              okText="Delete"
              cancelText="Cancel"
              onConfirm={() => deleteRole(record.id)}
            >
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                // disabled={!permissions.includes("CONTENT_ROLE_DELETE")}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  function showDrawer(data) {
    if (data) setEdit(data);
    setShow(true);
  }
  function closeDrawer() {
    setShow(false);
    setEdit("");
  }

  async function getRolesData(pageNumber, perPage, updatedFilter = filter) {
    setLoading(true);
    axios
      .get(
        `/api/content_roles/get?${await apiQueryHandler(
          QUERY_CONTENT_ROLE_CONST,
          updatedFilter,
          order,
          QUERY_CONTENT_ROLE_CONST.fields,
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

        setData(result.value);
        setShow(false);
      })
      .catch((error) => {
        errorMessage(error);
      })
      .finally(() => {
        setLoading(false);
        setShow(false);
      });
  }

  function deleteRole(id) {
    if (!roleandTitleID?.includes(id)) {
      setLoading(true);
      axios
        .post("/api/content_roles/delete", { id })
        .then((res) => {
          getRolesData(paging.pageNumber, paging.perPage);
          setLoading(false);
        })
        .catch((err) => {
          errorMessage(err);
        });
    } else {
      message.error("Cannot delete the role because it is already in use.");
      setLoading(false);
    }
  }
  function closeForm() {
    setShow(false);
    setEdit(" ");
    getRolesData(paging.pageNumber, paging.perPage);
  }

  function FormHandler() {
    return <RoleForm edit={edit} closeForm={closeForm} />;
  }
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row justify="space-between" align="center" gutter={24}>
            <Col span={24} flex="auto">
              <SearchHandler
                filter={filter}
                setFilter={setFilter}
                order={order}
                setOrder={setOrder}
                pagination={paging}
                apiHandler={getRolesData}
              />
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={() => showDrawer()}
                disabled={!permissions.includes("DISPLAY_PLAYLIST_CREATE")}
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
            dataSource={data}
            columns={columns}
            loading={loading}
            pagination={{
              total: paging.total,
              defaultCurrent: 1,
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: [10, 20, 50],
              onChange: (pageNumber, perPage) => {
                getRolesData(pageNumber, perPage);
              },
            }}
          ></Table>
        </Col>
      </Row>
      <Drawer
        title={edit ? "Edit Role" : "Create Role"}
        placement="right"
        onClose={() => closeDrawer()}
        open={show}
        width="700"
        destroyOnClose
      >
        {FormHandler()}
      </Drawer>
    </div>
  );
}
