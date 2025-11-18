"use client";
import { useState } from "react";
import {
  Button,
  Row,
  Table,
  Col,
  Drawer,
  Popconfirm,
  Tooltip,
  Space,
  Form,
  Select,
  Input,
  Typography,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  ADS_ENUM_ADS_STREAMING_TYPE,
  ADS_ENUM_ADS_TARGET_USER,
} from "@/lib/const";
import axios from "axios";
import { errorMessage } from "@/lib/uiFunctions";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_DISPLAY_AD_STREAMING_CONST } from "@/lib/queryConst";
import SearchHandler from "@/lib/searchHandler";

export default function StreamingBody({ permissions, preData }) {
  const [data, setData] = useState(preData.value);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const { Paragraph } = Typography;
  const [filter, setFilter] = useState(QUERY_DISPLAY_AD_STREAMING_CONST.filter);
  const [order, setOrder] = useState(QUERY_DISPLAY_AD_STREAMING_CONST.order);

  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: preData?.count,
  });

  const showDrawer = (data) => {
    if (data) {
      setEdit(data);
    }
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setEdit("");
  };
  const onFinish = ({
    adsStreamingUrl,
    adsStreamingType,
    adsStartTime,
    status,
    targetUser,
  }) => {
    if (edit) {
      axios
        .post("/api/streaming/update", {
          adsStreamingUrl,
          adsStreamingType,
          adsStartTime,
          status,
          targetUser,
          id: edit.id,
        })
        .then((res) => {
          getStreamData(paging.pageNumber, paging.perPage);
          onClose();
        })
        .catch((err) => errorMessage(err));
    } else {
      axios
        .post("/api/streaming/create", {
          adsStreamingUrl,
          adsStreamingType,
          adsStartTime,
          status,
          targetUser,
        })
        .then((res) => {
          getStreamData(paging.pageNumber, paging.perPage);
          onClose();
        })
        .catch((err) => errorMessage(err));
    }
  };
  async function getStreamData(pageNumber, perPage, updatedFilter = filter) {
    setLoading(true);
    axios
      .get(
        `/api/streaming/get_streaming_data?${await apiQueryHandler(
          QUERY_DISPLAY_AD_STREAMING_CONST,
          updatedFilter,
          order,
          QUERY_DISPLAY_AD_STREAMING_CONST.fields,
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
      })
      .catch((error) => {
        error.message;
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function deleteData(id) {
    axios
      .post("/api/streaming/delete", { id })
      .then((res) => getStreamData(paging.pageNumber, paging.perPage))
      .catch((err) => errorMessage(err));
  }
  const columns = [
    {
      title: "Streaming Type",
      dataIndex: "adsStreamingType",
      align: "center",
    },
    {
      title: "Start Time",
      dataIndex: "adsStartTime",
      align: "center",
    },
    {
      title: "Target User",
      dataIndex: "targetUser",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "end",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            ghost
            //   disabled={!permissions.includes("CMS_USER_PASSWORD")}
          >
            Published
          </Button>
          <Tooltip title="Edit User">
            <Button
              type="primary"
              onClick={() => showDrawer(record)}
              disabled={!permissions.includes("DISPLAY_ADS_ STREAMING_EDIT")}
              icon={<EditOutlined />}
            />
          </Tooltip>

          <Popconfirm
            title="Delete User"
            description={`Are you sure Delete' ?`}
            okText="Delete"
            cancelText="Cancel"
            onConfirm={() => deleteData(record.id)}
          >
            <Button
              disabled={!permissions.includes("DISPLAY_ADS_ STREAMING_DELETE")}
              type="primary"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  function FormHandler() {
    return (
      <Form
        initialValues={edit ? edit : ""}
        name="streaming"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Streaming URL"
          name="adsStreamingUrl"
          rules={[
            {
              required: true,
              message: "Please input your Straming URL!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Start Time"
          name="adsStartTime"
          rules={[
            {
              required: true,
              message: "Please input your start Time!",
            },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="Streaming Type"
          name="adsStreamingType"
          rules={[
            {
              required: true,
              message: "Please input your Straming Type!",
            },
          ]}
        >
          <Select>
            {ADS_ENUM_ADS_STREAMING_TYPE.map((type) => (
              <Select.Option key={type}>{type}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Target User"
          name="targetUser"
          rules={[
            {
              required: true,
              message: "Please input your  Targer User!",
            },
          ]}
        >
          <Select>
            {ADS_ENUM_ADS_TARGET_USER.map((user) => (
              <Select.Option key={user}>{user}</Select.Option>
            ))}
          </Select>
        </Form.Item>

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
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row justify="space-between" gutter={24}>
          <Col span={24} flex="auto">
            <SearchHandler
              filter={filter}
              setFilter={setFilter}
              order={order}
              setOrder={setOrder}
              pagination={paging}
              apiHandler={getStreamData}
            />
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                showDrawer();
              }}
              disabled={!permissions.includes("DISPLAY_ADS_STREAMING_CREATE")}
            >
              Create
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Table
          dataSource={data}
          columns={columns}
          loading={loading}
          rowKey={(e) => e.id}
          pagination={{
            total: paging.total,
            defaultCurrent: 1,
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50],
            onChange: (pageNumber, perPage) => {
              getStreamData(pageNumber, perPage);
            },
          }}
          expandable={{
            rowExpandable: (record) => true,
            expandedRowRender: (record) => (
              <Paragraph
                copyable={{
                  text: record.adsStreamingUrl,
                }}
              >
                Ads Streaming URL : {record.adsStreamingUrl}
              </Paragraph>
            ),
          }}
        ></Table>
      </Col>
      <Drawer
        title={edit ? "Edit Ads Streaming" : "Create Ads Streaming"}
        placement="right"
        onClose={onClose}
        open={open}
        width={500}
        destroyOnClose
      >
        {FormHandler()}
      </Drawer>
    </Row>
  );
}
