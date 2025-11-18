"use client";
import { errorMessage } from "@/lib/uiFunctions";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Row,
  Space,
  Table,
  Col,
  Drawer,
  Avatar,
  Popconfirm,
  message,
  Typography,
} from "antd";
import axios from "axios";
import { useState } from "react";
import CreditForm from "@/components/Content/CreditForm";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_CONTENT_CREDIT_CONST } from "@/lib/queryConst";

export default function CreditBody({ permissions, preData }) {
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: preData?.count,
  });
  const [data, setData] = useState(preData.value);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [creditTitleID, setCreditTitleID] = useState(
    preData?.creditTitleID?.value
  );
  const creditandTitleID = creditTitleID?.map((item) => item.creditId);
  const columns = [
    {
      dataIndex: "profileImage",
      render: (_, record) => {
        return <Avatar src={record.profileImage} />;
      },
    },

    {
      title: "Name",
      dataIndex: "nameMm",
    },
    {
      title: "Name",
      dataIndex: "nameEn",
    },
    {
      title: "Actor Academy",
      dataIndex: "actorAcademy",
    },
    {
      title: "Director Academy",
      dataIndex: "directorAcademy",
    },
    {
      title: "Owner Academy",
      dataIndex: "ownerAcademy",
    },
    {
      title: "Start Year",
      dataIndex: "startYear",
    },
    {
      title: "End Year",
      dataIndex: "endYear",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      render: (_, record) => {
        return <Typography>{record.createdBy?.name}</Typography>;
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
              disabled={!permissions.includes("CONTENT_CREDIT_EDIT")}
              onClick={() => showDrawer(record)}
            />
            <Popconfirm
              title="Delete Credit"
              description={`Are you sure Delete?`}
              okText="Delete"
              cancelText="Cancel"
              onConfirm={() => deleteCredit(record.id)}
            >
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                // disabled={!permissions.includes("CONTENT_CREDIT_DELETE")}
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

  async function getCreditData(pageNumber, perPage) {
    setLoading(true);
    axios
      .get(
        `/api/content_credits/get_credits?${await apiQueryHandler(
          QUERY_CONTENT_CREDIT_CONST,
          QUERY_CONTENT_CREDIT_CONST.filter,
          QUERY_CONTENT_CREDIT_CONST.order,
          QUERY_CONTENT_CREDIT_CONST.fields,
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
        if (result.value && result.value.length !== 0) {
          setData([...result.value]);
        }
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
  function closeForm() {
    setShow(false);
    setEdit(" ");
    getCreditData(paging.pageNumber, paging.perPage);
  }
  function deleteCredit(id) {
    if (!creditandTitleID?.includes(id)) {
      setLoading(true);
      axios
        .post("/api/content_credits/delete", { id })
        .then((res) => {
          getCreditData(paging.pageNumber, paging.perPage);
          setLoading(false);
        })
        .catch((err) => {
          errorMessage(err);
        });
    } else {
      message.error("Cannot delete the Credit because it is already in use.");
      setLoading(false);
    }
  }

  function FormHandler() {
    return <CreditForm edit={edit} closeForm={closeForm} />;
  }
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row justify="end" gutter={16}>
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
                getCreditData(pageNumber, perPage);
              },
            }}
          ></Table>
        </Col>
      </Row>
      <Drawer
        title={edit ? "Edit Credit" : "Create Credit"}
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
