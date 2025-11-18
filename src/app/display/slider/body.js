"use client";
import {
  ADS_ENUM_DISPAY_LOCATION,
  DISPLAY_LOCATION,
  SLIDER_ENUM_BANNER,
} from "@/lib/const";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import {
  Table,
  Row,
  Col,
  Button,
  Popconfirm,
  Space,
  Drawer,
  Form,
  Input,
  Select,
} from "antd";
import { useState } from "react";
import { errorMessage } from "@/lib/uiFunctions";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_DISPLAY_AD_SLIDER_CONST } from "@/lib/queryConst";
import SearchHandler from "@/lib/searchHandler";
export default function SliderItemBody({ permissions, preData }) {
  const [data, setData] = useState(preData.value);
  const [loading, setLoading] = useState(false);

  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: preData?.count,
  });
  const [filter, setFilter] = useState(QUERY_DISPLAY_AD_SLIDER_CONST.filter);
  const [order, setOrder] = useState(QUERY_DISPLAY_AD_SLIDER_CONST.order);

  const [bannerTypeValue, setBannerTypeValue] = useState("");
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const showDrawer = (data) => {
    if (data) {
      setEdit(data);
    }
    setOpen(true);
  };
  function closeDrawer() {
    setOpen(false);
    setEdit("");
  }

  async function getSliderData(pageNumber, perPage, updatedFilter = filter) {
    console.log(updatedFilter);
    setLoading(true);
    axios
      .get(
        `/api/slider/get_sliders?${await apiQueryHandler(
          QUERY_DISPLAY_AD_SLIDER_CONST,
          updatedFilter,
          order,
          QUERY_DISPLAY_AD_SLIDER_CONST.fields,
          "no_child",
          { pageNumber, perPage }
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
        setOpen(false);
      })
      .catch((error) => {
        errorMessage(error);
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  }

  function deleteSlider(id) {
    axios
      .post("/api/slider/delete", { id })
      .then((res) => {
        getSliderData(paging.pageNumber, paging.perPage);
      })
      .catch((err) => console.log(err));
  }

  function submitHandler({
    name,
    displayLocation,
    bannerType,
    htmlCode,
    webLink,
    imageUrl,
  }) {
    if (edit) {
      axios
        .post("/api/slider/update", {
          id: edit.id,
          name,
          displayLocation,
          bannerType,
          htmlCode,
          webLink,
          imageUrl,
          titleId: "f309d79d-c3f1-11ed-bf4d-0e001b930b03",
        })
        .then((res) => getSliderData(paging.pageNumber, paging.perPage))
        .catch((err) => errorMessage(err));
    } else {
      axios
        .post("/api/slider/create", {
          name,
          bannerType,
          displayLocation,
          htmlCode,
          webLink,
          imageUrl,
          titleId: "f309d79d-c3f1-11ed-bf4d-0e001b930b03",
        })

        .then((res) => getSliderData(paging.pageNumber, paging.perPage))
        .catch((err) => console.log(err));
    }
  }
  function FormHandler() {
    return (
      <Form
        name="slider"
        autoComplete="false"
        initialValues={edit ? edit : " "}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={submitHandler}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: false,
              message: "Name  is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="displayLocation"
          label="Display Location"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            {DISPLAY_LOCATION.map((type) => (
              <Select.Option key={type}>{type}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="bannerType"
          label="Banner Type"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select onChange={(type) => setBannerTypeValue(type)}>
            {SLIDER_ENUM_BANNER.map((type) => (
              <Select.Option key={type}>{type}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        {bannerTypeValue === "htmlCode" ? (
          <Form.Item
            name="htmlCode"
            label="Html Code"
            rules={[
              {
                required: true,
                message: "Html code  is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          <>
            <Form.Item name="webLink" label="Web Link">
              <Input />
            </Form.Item>
            <Form.Item
              name="imageUrl"
              label="Image Url"
              rules={[
                {
                  required: true,
                  message: "ImageURL  is required",
                },
              ]}
            >
              {/* <Row gutter={8}>
                <Col flex="auto">
                  <Input />
                </Col>
                <Col>
                  <Button type="primary" htmlType="submit" onClick={showModal}>
                    Upload
                  </Button>
                </Col>
              </Row> */}
              <Input></Input>
            </Form.Item>
          </>
        )}

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
  function expandRowHandler(record) {
    let source;
    if (
      record.bannerType === "image" ||
      record.bannerType === "movie" ||
      record.bannerType === "webUrl"
    ) {
      source = record.imageUrl;
    } else if (record.bannerType === "htmlCode") {
      source = record.htmlCode;
    }
    return (
      <Row gutter={[16, 16]}>
        {record.bannerType === "htmlCode" ? (
          <div
            dangerouslySetInnerHTML={{
              __html: record.htmlCode
                .replace("'<", "<")
                .replace("/>'", "width='350px' />"),
            }}
          />
        ) : (
          <img
            style={{
              objectFit: "cover",
              width: "350px",
              opacity: "0.6",
            }}
            alt="image"
            src={source}
          />
        )}
      </Row>
    );
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Location",
      dataIndex: "displayLocation",
      align: "center",
    },
    {
      title: "Sequence",
      dataIndex: "sequence",
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      align: "right",
      render: (_, record) => {
        return (
          <Space>
            {/* <Button
              style={{
                background: record.status ? "#2bba3e" : "#cf3e43",
                color: "white",
              }}
              icon={record.status ? <ToTopOutlined /> : <StopOutlined />}
              onClick={() => publishAdList(record.id, record.status)}
            >
              {record.status ? "Published" : "Unpublished"}
            </Button> */}
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => showDrawer(record)}
              disabled={!permissions.includes("DISPLAY_SLIDER_EDIT")}
            />
            <Popconfirm
              title="Delete User"
              description={`Are you sure Delete AdList?`}
              okText="Delete"
              cancelText="Cancel"
              onConfirm={() => deleteSlider(record.id)}
            >
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                disabled={!permissions.includes("DISPLAY_SLIDER_DELETE")}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row justify="space-between" gutter={24}>
          <Col span={22} flex="auto">
            <SearchHandler
              filter={filter}
              setFilter={setFilter}
              order={order}
              setOrder={setOrder}
              pagination={paging}
              apiHandler={getSliderData}
            />
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => showDrawer()}
              disabled={!permissions.includes("DISPLAY_SLIDER_CREATE")}
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
          rowKey={(e) => e.id}
          dataSource={data}
          columns={columns}
          loading={loading}
          expandable={{
            rowExpandable: (record) => true,
            expandedRowRender: (record) => expandRowHandler(record),
          }}
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
        ></Table>
      </Col>
      <Drawer
        open={open}
        title={edit ? `Edit Item (${edit?.name})` : "Create New Item"}
        onClose={() => closeDrawer()}
        placement="right"
        width={500}
        destroyOnClose="true"
      >
        {FormHandler()}
      </Drawer>
    </Row>
  );
}
