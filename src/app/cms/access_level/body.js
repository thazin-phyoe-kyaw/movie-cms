"use client";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ACCESS_LVLS } from "@/lib/const";
import { color } from "../../../lib/globalFunctions";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  message,
  Typography,
  Select,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { nextQueryHandler } from "@/lib/globalFunctions";
import axios from "axios";
import { errorMessage } from "@/lib/uiFunctions";
const { Text } = Typography;
export default function AccessLevlesBody({ permissions, accessData }) {
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: 1,
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(accessData.value);
  const [editData, setEditData] = useState({});
  const [showDrawer, setShowDrawer] = useState(false);
  const [filter, setFilter] = useState({
    isPublished: { value: true, type: "boolean" },
  });

  const groupedData = ACCESS_LVLS.reduce((result, item) => {
    const { group, ...rest } = item;
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(rest);
    return result;
  }, {});
  const groupedArray = Object.entries(groupedData).map(([group, items]) => ({
    group,
    items,
  }));

  function getData(pageNumber, perPage) {
    setLoading(true);
    axios
      .get(
        `/api/access_lvl/get_list${nextQueryHandler(filter, {
          pageNumber,
          perPage,
        })}`
      )
      .then(({ data }) => {
        setPaging({ pageNumber, perPage, total: data["@odata.count"] });
        setData(data.value);
      })
      .catch((error) => {
        errorMessage(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function closeDrawer() {
    setShowDrawer(false);
    setEditData(false);
  }

  function openDrawer(data) {
    if (data) {
      setEditData(data);
      setShowDrawer(true);
    } else {
      setShowDrawer(true);
    }
  }
  async function submitForm(value) {
    const { id, name, description, ...data } = value;
    const roles = Object.values(data).filter((a) => a !== "0");

    if (roles.length === 0) {
      message.error("You need to select one permission to create!");
    } else {
      const dd = { name, description, roles };
      if (!editData?.id) {
        setLoading(true);
        axios
          .post(`/api/access_lvl/create`, { ...dd })
          .catch((error) => {
            errorMessage(error);
          })
          .finally(() => {
            closeDrawer();
          });
      } else {
        setLoading(true);
        axios
          .post(`/api/access_lvl/update`, { id: value.id, ...dd })
          .catch((error) => {
            errorMessage(error);
          })
          .finally(() => {
            closeDrawer();
          });
      }
    }
  }

  async function deleteRole(id) {
    setLoading(true);
    axios
      .post("/api/access_lvl/delete", { id })
      .catch((err) => errorMessage(err))
      .finally(() => {
        getData(paging.pageNumber, paging.perPage);
      });
  }

  function roleForm() {
    return (
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        name="roleForm"
        onFinish={(e) => submitForm(e)}
        autoComplete="false"
        initialValues={
          editData
            ? {
                id: editData.id,
                name: editData.name,
                description: editData.description,
                ...groupedArray.reduce((result, { group, items }) => {
                  const selectedRole = items.filter((item) =>
                    editData?.roles?.includes(item.key)
                  );
                  result[group] =
                    selectedRole.length > 0 ? selectedRole[0].id : "0";
                  return result;
                }, {}),
              }
            : { required: false }
        }
      >
        {editData && (
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
        )}
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <TextArea rows={3} />
        </Form.Item>

        {groupedArray.map((item) => {
          return (
            <Form.Item
              label={item.group}
              key={item.key}
              name={item.group}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Select
                options={[
                  ...item.items.map((option) => ({
                    value: option.id,
                    label: option.key,
                    key: option.key,
                  })),
                  { value: "0", label: "No Permission" },
                ]}
              />
            </Form.Item>
          );
        })}

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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (data, index) => {
        return (
          <Tooltip placement="bottom" title={index.description}>
            <Text>{data}</Text>
          </Tooltip>
        );
      },
    },
    {
      title: "Roles",
      dataIndex: "roles",
      render: (data) => {
        return data.map((value, index) => (
          <Tag color={color(value)} key={`permissions${index}`}>
            {value}
          </Tag>
        ));
      },
    },

    {
      title: "Action",
      dataIndex: "setting",
      render: (_, data) => {
        return (
          <Space>
            <Button
              type="primary"
              onClick={() => openDrawer(data)}
              disabled={!permissions.includes("ACCESS_EDIT")}
              icon={<EditOutlined />}
            ></Button>
            <Popconfirm
              title="Delete Role"
              description="Are you sure delete access lvl role"
              okText="Yes"
              cancelText="No"
              onConfirm={() => deleteRole(data.id)}
            >
              <Button
                type="primary"
                disabled={!permissions.includes("ACCESS_DELETE")}
                danger
                icon={<DeleteOutlined />}
              ></Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row justify="end">
          <Col>
            <Button
              type="primary"
              onClick={() => openDrawer()}
              disabled={!permissions.includes("ACCESS_CREATE")}
            >
              Add New
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Table
          rowKey={(element) => element.id}
          loading={loading}
          dataSource={data}
          size="middle"
          columns={columns}
          pagination={{
            total: paging.total,
            defaultCurrent: 1,
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50],
            onChange: (pageNumber, perPage) => {
              getData(pageNumber, perPage);
            },
          }}
        />
      </Col>
      <Drawer
        title={editData?.id ? "Edit Role" : "Create New Role"}
        placement="right"
        width={700}
        onClose={() => closeDrawer()}
        open={showDrawer}
        destroyOnClose="true"
      >
        {roleForm()}
      </Drawer>
    </Row>
  );
}
