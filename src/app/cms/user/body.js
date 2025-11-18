"use client";
import {
  Space,
  Table,
  Button,
  Row,
  Col,
  message,
  Tooltip,
  Popconfirm,
  Drawer,
  Form,
  Input,
  Select,
  Modal,
  Collapse,
} from "antd";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  nextQueryHandler,
  odataQueryGenerator,
  passwordChecker,
} from "@/lib/globalFunctions";
import axios from "axios";
import { errorMessage } from "@/lib/uiFunctions";
import { QUERY_CMS_USER_CONST } from "@/lib/queryConst";
import CmsCreateUserForm from "@/components/CMSuser/CmsCreateForm";
import SearchHandler from "@/lib/searchHandler";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
//
export default function UserPage({ permissions, cmsUsers, accessLvls }) {
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: cmsUsers.count,
  });
  const [data, setData] = useState(cmsUsers.value);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);

  // const filter = {
  //   isDelete: { value: false, type: "null" },
  // };

  const [filter, setFilter] = useState(QUERY_CMS_USER_CONST.filter);
  const [order, setOrder] = useState(QUERY_CMS_USER_CONST.order);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const accessList = accessLvls.value;
  const showModal = (email) => {
    setIsModalOpen(true);
    setEmail(email);
  };
  const showAccessModal = (id) => {
    setIsAccessModalOpen(true);
    setUserId(id);
  };
  const handleAccessOk = () => {
    setIsAccessModalOpen(false);
  };
  const handleAccesssCancel = () => {
    setIsAccessModalOpen(false);
  };

  const items = [
    {
      label: "Search",
      children: (
        <Form onFinish={submitSearch}>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Acesslevel" name="accesslevelId">
            <Select>
              {accessList.map((list) => (
                <Select.Option key={list.id} value={list.id}>
                  {list.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Row justify="end" gutter={12}>
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button type="default" htmlType="submit">
                  Cancel
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
  ];

  function submitSearch({ name, email, accesslevelId }) {
    getDataList(paging.pageNumber, paging.perPage, {
      ...filter,
      name: { value: name ? name : "", type: "string" },
      email: { value: email ? email : "", type: "string" },
      accesslevelId: { value: accesslevelId ? accesslevelId : " ", type: "id" },
    });
  }
  const accessLevelUpdate = ({ accessLevelId }) => {
    axios
      .post("/api/user/access_update", { userId, accessLevelId })
      .then(() => {
        getDataList(paging.pageNumber, paging.perPage, filter);
      })
      .catch((err) => errorMessage(err));
    setIsAccessModalOpen(false);
  };

  async function getDataList(pageNumber, perPage, updatedFilter = filter) {
    setLoading(true);
    // axios
    // .get(
    //   `/api/user/getList${nextQueryHandler(newFilter, {
    //     pageNumber,
    //     perPage,
    //   })}`
    // )
    axios
      .get(
        `/api/user/getList?${await apiQueryHandler(
          QUERY_CMS_USER_CONST,
          updatedFilter,
          order,
          QUERY_CMS_USER_CONST.fields,
          "normal",
          { pageNumber, perPage }
        )}`
      )
      .then(({ data: result }) => {
        if (result.value.length < 1) {
          message.warning("No user found");
        }
        setPaging({
          pageNumber,
          perPage,
          total: result["@odata.count"],
        });
        setData(result.value);
      })
      .catch((error) => {
        errorMessage(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function deleteUser(id) {
    setLoading(true);
    axios
      .post("/api/user/delete", { id })
      .then(() => {
        getDataList(paging.pageNumber, paging.perPage, filter);
      })
      .catch((err) => errorMessage(err));
  }

  function openDrawer(data) {
    if (data) {
      setEdit(data);
    }
    setShowDrawer(true);
  }
  function closeDrawer() {
    setShowDrawer(false);
    getDataList(paging.pageNumber, paging.perPage, filter);
    setEdit(false);
  }

  const onFinish = (values) => {
    if (values.newPassword === values.confirmPassword) {
      axios
        .post(`/api/user/passwordReset`, {
          email,
          password: values.newPassword,
        })
        .catch((err) => {
          errorMessage;
        });
      message.success("Password Reset Successfully");
    } else {
      message.error("Password must be same");
    }

    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      render: (text) => (
        <a> {text.replace(/\b\w/g, (match) => match.toUpperCase())} </a>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "AccessLevel",
      dataIndex: ["AccessLevel", "name"],
      align: "center",
      render: (accessName, record) => {
        return (
          <>
            <Button
              disabled={!permissions.includes("CMS_USER_ACCESS_EDIT")}
              type="primary"
              onClick={() => showAccessModal(record.id)}
            >
              {accessName}
            </Button>
            <Modal
              open={isAccessModalOpen}
              onCancel={handleAccesssCancel}
              footer={null}
            >
              <Form onFinish={accessLevelUpdate}>
                <Form.Item
                  name="accessLevelId"
                  rules={[
                    { required: true, message: "Please select an option" },
                  ]}
                >
                  <Select style={{ width: "300px" }}>
                    {accessList.map((list) => (
                      <Select.Option key={list.id} value={list.id}>
                        {list.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Row justify="end">
                  <Col>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginRight: "8px" }}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item>
                      <Button type="default" onClick={handleAccesssCancel}>
                        Cancel
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Modal>
          </>
        );
      },
    },
    {
      title: "",
      key: "action",
      align: "end",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            ghost
            disabled={!permissions.includes("CMS_USER_PASSWORD")}
            onClick={(e) => showModal(record.email)}
          >
            Password Reset
          </Button>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={onFinish}
            onCancel={() => {
              setIsModalOpen(false);
            }}
            footer={null}
          >
            <Form name="myForm" onFinish={onFinish}>
              <Form.Item label="Email" name="email" initialValue={email}>
                <Input placeholder={email} disabled={true} />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  { required: true, message: "Please enter your Old Password" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  { required: true, message: "Please enter your New Password" },
                ]}
              >
                <Input />
              </Form.Item>
              <Row justify="end">
                <Col>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginRight: "8px" }}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Button
                      type="default"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
          <Tooltip title="Edit User">
            <Button
              type="primary"
              onClick={() => openDrawer(record)}
              disabled={!permissions.includes("CMS_USER_EDIT")}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Tooltip title="Delete User">
            <Popconfirm
              title="Delete User"
              description={`Are you sure Delete user '${record.name}' ?`}
              okText="Delete"
              cancelText="Cancel"
              onConfirm={() => deleteUser(record.id)}
              disabled={record.isDelete}
            >
              <Button
                disabled={!permissions.includes("CMS_USER_DELETE")}
                type="primary"
                danger
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  function submitHandler(data) {
    setLoading(true);
    if (!edit) {
      axios
        .post("/api/user/create", {
          name: data.name,
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
          address: data.address,
          accessLevelId: data.accessLevelId,
          siteAdminNote: data.siteAdminNote,
        })
        .then(() => {
          closeDrawer();
        })
        .catch((error) => {
          message.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        })
        .finally(() => {
          closeDrawer();
        });
    } else {
      axios
        .post("/api/user/update", {
          id: data.id,
          name: data.name,
          phoneNumber: data.phoneNumber,
          address: data.address,
          accessLevelId: data.accessLevelId,
          siteAdminNote: data.siteAdminNote,
          avatar: data.avatar,
        })
        .then(() => {
          closeDrawer();
        })
        .catch((err) => {
          errorMessage(err);
          setLoading(false);
        });
    }
  }
  function passwordChecker(value) {
    if (value.length >= 8 && /[!@#$%^&*]/.test(value)) {
      return true;
    }
    return false;
  }
  function formHandler() {
    return (
      <CmsCreateUserForm
        loading={loading}
        edit={edit}
        submitHandler={submitHandler}
        accessList={accessList}
        passwordChecker={passwordChecker}
      />
    );
  }

  return (
    <Row
      gutter={[16, 16]}
      style={{ maxHeight: "calc(100vh - 96px)", overflowY: "auto" }}
    >
      <Col span={24}>
        <Row justify="space-between" align="center" gutter={16}>
          {/* <Col flex="auto">
            <Collapse items={items} size="small" />

          </Col> */}
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
          <Col>
            <Button
              type="primary"
              onClick={() => openDrawer()}
              disabled={!permissions.includes("CMS_USER_DELETE")}
            >
              Create New
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          className={{ marginTop: "10px" }}
          rowKey={(e) => e.id}
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
                <>
                  <Row>
                    <Col span={4}>Phone Number </Col>
                    <Col span={2}>:</Col>
                    <Col span={18}>{record.phoneNumber}</Col>
                  </Row>
                  <Row>
                    <Col span={4}>Address </Col>
                    <Col span={2}>:</Col>
                    <Col span={18}>{record.address}</Col>
                  </Row>

                  <Row>
                    <Col span={4}>Site Admin Note </Col>
                    <Col span={2}>:</Col>
                    <Col span={18}>{record.siteAdminNote}</Col>
                  </Row>
                </>
              );
            },
          }}
        />
      </Col>
      <Drawer
        title={edit ? "Edit User" : "Create New User"}
        placement="right"
        width={500}
        open={showDrawer}
        onClose={() => closeDrawer()}
        destroyOnClose
      >
        {formHandler()}
      </Drawer>
    </Row>
  );
}
