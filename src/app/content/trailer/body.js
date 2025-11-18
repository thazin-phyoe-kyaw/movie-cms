"use client";
import TrailerForm from "@/components/Content/TrailerForm";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_CONTENT_TRAILER_CONST } from "@/lib/queryConst";
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
  Typography,
} from "antd";
import axios from "axios";
import { useState } from "react";
export default function TrailerBody({ permissions, preData }) {
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: preData?.count,
  });
  const [data, setData] = useState(preData?.value);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [titleList, setTitleList] = useState([]);

  const [filter, setFilter] = useState(QUERY_CONTENT_TRAILER_CONST.filter);
  const [order, setOrder] = useState(QUERY_CONTENT_TRAILER_CONST.order);

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
      title: "Trailer URL",
      key: "trailerUrl",
      render: (_, record) => (
        <a href={record.trailerUrl}>{record.trailerUrl}</a>
      ),
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
              disabled={!permissions.includes("CONTENT_ROlE_EDIT")}
              onClick={() => showDrawer(record)}
            />
            <Popconfirm
              title="Delete User"
              description={`Are you sure Delete?`}
              okText="Delete"
              cancelText="Cancel"
              onConfirm={() => deleteTrailer(record.id)}
            >
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                // disabled={!permissions.includes("CONTENT_TAG_DELETE")}
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
  async function getTrailers(pageNumber, perPage, updatedFilter = filter) {
    setLoading(true);
    axios
      .get(
        `/api/content_trailer/get?${await apiQueryHandler(
          QUERY_CONTENT_TRAILER_CONST,
          updatedFilter,
          order,
          QUERY_CONTENT_TRAILER_CONST.fields,
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

  function deleteTrailer(id) {
    setLoading(true);
    axios
      .post("/api/content_trailer/delete", { id })
      .then((res) => {
        getTrailers(paging.pageNumber, paging.perPage);
        setLoading(false);
      })
      .catch((err) => errorMessage(err));
  }

  function getTitleList(name) {
    setLoading(true);
    axios
      .get(
        `/api/general/get_title_by_name?name=${name}&pageNumber=1&perPage=15`
      )
      .then(({ data }) => {
        const old = titleList.map((title) => title.value);
        const nwList = data.value.filter((title) => !old.includes(title.id));
        setTitleList([
          ...nwList.map((title) => ({ label: title.titleMm, value: title.id })),
          ...titleList,
        ]);
      })
      .catch((err) => {
        errorMessage(err);
      })
      .finally(() => setLoading(false));
  }
  function submitHandler({ nameMm, nameEn, trailerUrl, titleId }) {
    if (edit) {
      axios
        .post("/api/content_trailer/update", {
          id: edit.id,
          nameMm,
          nameEn,
          trailerUrl,
          titleId,
        })

        .then((res) => getTrailers(paging.pageNumber, paging.perPage))
        .catch((err) => console.log(err));
    } else {
      axios
        .post("/api/content_trailer/create", {
          nameMm,
          nameEn,
          trailerUrl,
          titleId,
        })
        .then((res) => getTrailers(paging.pageNumber, paging.perPage))
        .catch((err) => console.log(err));
    }
  }
  function FormHandler() {
    return (
      <TrailerForm
        edit={edit}
        loading={loading}
        submitHandler={submitHandler}
        titleList={titleList}
        getTitleList={getTitleList}
      />
    );
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
                apiHandler={getTrailers}
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
                getTrailers(pageNumber, perPage);
              },
            }}
          ></Table>
        </Col>
      </Row>
      <Drawer
        title={edit ? "Edit Trailer" : "Create Trailer"}
        placement="right"
        onClose={() => closeDrawer()}
        open={show}
        width={700}
        destroyOnClose
      >
        {FormHandler()}
      </Drawer>
    </div>
  );
}
