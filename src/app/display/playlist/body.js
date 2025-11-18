"use client";
import { useState } from "react";
import {
  Row,
  Col,
  Button,
  Table,
  Drawer,
  Space,
  Popconfirm,
  Form,
  Select,
  Input,
  Divider,
  Spin,
} from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  ToTopOutlined,
  StopOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { nextQueryHandler } from "@/lib/globalFunctions";
import { PLAYLIST_LOCATION, VIEW_TYPE } from "@/lib/const";
import { errorMessage } from "@/lib/uiFunctions";
import { debounce } from "lodash";
import ModalBody from "./modal";
export default function PlaylistBody({ permissions, preData }) {
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: preData?.count,
  });

  const [data, setData] = useState(preData.value);

  const [filter, setFilter] = useState({
    status: { value: "true", type: "boolean" },
  });
  const [edit, setEdit] = useState(false);
  const [itemEdit, setItemEdit] = useState(false);
  const [location, setLocation] = useState("");
  const [titleList, setTitleList] = useState([]);
  const [movieTitleList, setMovieTitleList] = useState([]);
  const [seriesTitleList, setSeriesTitleList] = useState([]);
  const [selectedGenreItems, setSelectedGenreItems] = useState([]);
  const [titleLoading, setTitleLoading] = useState(false);
  const [movieLoading, setMovieLoading] = useState(false);
  const [seriesLoading, setSeriesLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [titleId, setTitleId] = useState([]);
  const [adminPlaylist, setAdminPlaylist] = useState(false);
  const [titles, setTitles] = useState([]);

  const showDrawer = (data) => {
    if (data) {
      setEdit(data);
    }
    setOpen(true);
  };

  const showPlaylistDrawer = async (data) => {
    setAdminPlaylist(data);
    const titleIds = data.map((playlist) => playlist.titleId);
    setTitles(titleIds);
    setItemOpen(true);
  };

  function closeDrawer() {
    setOpen(false);
    setEdit("");
  }
  function closeItemDrawer() {
    setItemOpen(false);
    setItemEdit("");
  }
  const handleSelectGenreItems = (selectedItems) => {
    setSelectedGenreItems(selectedItems);
  };

  function getTitleList(name) {
    setTitleLoading(true);
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
      .finally(() => setTitleLoading(false));
  }
  function getMovieTitle(name) {
    setMovieLoading(true);
    axios
      .get(`/api/general/get_movie_titles?name=${name}&pageNumber=1&perPage=15`)
      .then(({ data }) => {
        const old = movieTitleList.map((title) => title.value);
        const nwList = data.value.filter((title) => !old.includes(title.id));
        setMovieTitleList([
          ...nwList.map((title) => ({
            label: title.titleMm,
            value: title.id,
            type: title.type,
          })),
        ]);
      })
      .catch((err) => {
        errorMessage(err);
      })
      .finally(() => setMovieLoading(false));
  }
  function getSeriesTitle(name) {
    setSeriesLoading(true);
    axios
      .get(
        `/api/general/get_series_titles?name=${name}&pageNumber=1&perPage=15`
      )
      .then(({ data }) => {
        const old = seriesTitleList.map((title) => title.value);
        const nwList = data.value.filter((title) => !old.includes(title.id));
        setSeriesTitleList([
          ...nwList.map((title) => ({
            label: title.titleMm,
            value: title.id,
            type: title.type,
          })),
        ]);
      })
      .catch((err) => {
        errorMessage(err);
      })
      .finally(() => setSeriesLoading(false));
  }
  function handleChange(value) {
    setTitleId(value);
  }

  function submitPlaylistItemHandler({ titles }) {
    axios
      .post("/api/playlist/create_items", {
        titles,
      })
      .then((res) => getPlaylistsData(paging.pageNumber, paging.perPage))
      .catch((err) => errorMessage(err));
  }
  function submitHandler({ titleEn, titleMy, playlistLocation, viewType }) {
    if (titleId.length > 1) {
      axios
        .post("/api/playlist/create_playlists_items", {
          titleEn,
          titleMy,
          viewType,
          playlistLocation,
          titleId,
        })
        .then((res) => getPlaylistsData(paging.pageNumber, paging.perPage))
        .catch((err) => errorMessage(err));
    } else {
      if (edit) {
        axios
          .post("/api/playlist/update", {
            id: edit.id,
            titleEn,
            titleMy,
            viewType,
            playlistLocation,
          })
          .then((res) => getPlaylistsData(paging.pageNumber, paging.perPage))
          .catch((err) => errorMessage(err));
      } else {
        axios
          .post("/api/playlist/create", {
            titleEn,
            titleMy,
            viewType,
            playlistLocation,
          })
          .then((res) => getPlaylistsData(paging.pageNumber, paging.perPage))
          .catch((err) => console.log(err));
      }
    }
  }

  function FormHandler() {
    return (
      <Form
        name="playlists"
        autoComplete="false"
        initialValues={edit ? edit : " "}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={submitHandler}
      >
        <Form.Item
          name="titleEn"
          label="EN Title"
          rules={[
            {
              required: false,
              message: "Title  is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="titleMy"
          label="Mm Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="viewType"
          label="View Type"
          rules={[
            {
              required: true,
              message: "Please select a  view type",
            },
          ]}
        >
          <Select>
            {VIEW_TYPE.map((type) => (
              <Select.Option value={type} key={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="playlistLocation"
          label="Playlist Location"
          rules={[
            {
              required: true,
              message: "Please select a playlist location",
            },
          ]}
        >
          <Select onChange={(type) => setLocation(type)}>
            {PLAYLIST_LOCATION.map((type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Divider orientation="right">
          <Button onClick={() => setShow(true)} type="primary">
            Quick Select
          </Button>
        </Divider>

        {location === "home" ? (
          <>
            <Form.Item name="home" label="Home">
              <Select
                mode="multiple"
                onSearch={debounce((value) => {
                  getTitleList(value);
                }, 1500)}
                showSearch
                filterOption={false}
                defaultValue={selectedGenreItems ? selectedGenreItems : ""}
                onChange={handleChange}
              >
                {titleLoading && (
                  <Select.Option disabled value="0">
                    <Row justify="center" gutter={[16, 16]}>
                      <Col>
                        <Spin loading />
                      </Col>
                    </Row>
                  </Select.Option>
                )}

                {titleList.map((title) => (
                  <Select.Option key={title.value} value={title.value}>
                    {title.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </>
        ) : location === "movies" ? (
          <Form.Item name="movies" label="Movies">
            <Select
              showSearch
              mode="multiple"
              onSearch={debounce((value) => {
                getMovieTitle(value);
              }, 1500)}
              filterOption={false}
              onChange={handleChange}
            >
              {movieLoading && (
                <Select.Option disabled value="0">
                  <Row justify="center" gutter={[16, 16]}>
                    <Col>
                      <Spin loading />
                    </Col>
                  </Row>
                </Select.Option>
              )}

              {movieTitleList.map((title) => (
                <Select.Option key={title.value} value={title.value}>
                  {title.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        ) : (
          <Form.Item name="series" label="Series">
            <Select
              showSearch
              mode="multiple"
              onSearch={debounce((value) => {
                getSeriesTitle(value);
              }, 1500)}
              filterOption={false}
              onChange={handleChange}
            >
              {seriesLoading && (
                <Select.Option disabled value="0">
                  <Row justify="center" gutter={[16, 16]}>
                    <Col>
                      <Spin loading />
                    </Col>
                  </Row>
                </Select.Option>
              )}

              {seriesTitleList.map((title) => (
                <Select.Option key={title.value} value={title.value}>
                  {title.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
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
  function getPlaylistsData(pageNumber, perPage) {
    setLoading(true);
    axios
      .get(
        `/api/playlist/get_playlists${nextQueryHandler(filter, {
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

  const Playlistcolumns = [
    {
      title: "Type",
      dataIndex: "type",
      align: "center",
    },
    {
      title: "Title",
      dataIndex: "titleMm",
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      align: "right",
      render: (_, record) => {
        return (
          <Space>
            <Popconfirm
              title="Delete User"
              description={`Are you sure you want to remove this item?`}
              okText="Delete"
              cancelText="Cancel"
              // onConfirm={() => deletePlayList(record.id)}
            >
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                disabled={!permissions.includes("DISPLAY_PLAYLIST_DELETE")}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const columns = [
    {
      title: "Sequence",
      dataIndex: "sequence",
      align: "center",
    },
    {
      title: "EN Title",
      dataIndex: "titleEn",
      align: "start",
    },
    {
      title: "MY Title",
      dataIndex: "titleMy",
      align: "start",
    },
    {
      title: "Location ",
      dataIndex: "playlistLocation",
      align: "center",
    },
    {
      title: "Count ",
      align: "center",
      render: (_, record) => {
        return record.adminPlaylistTitles.length;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (_, record) => {
        return (
          <Button
            style={{
              background: record.status ? "#2bba3e" : "#cf3e43",
              color: "white",
            }}
            icon={record.status ? <ToTopOutlined /> : <StopOutlined />}
          >
            {record.status ? "Published" : "Unpublished"}
          </Button>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      align: "right",
      render: (_, record) => {
        return (
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showDrawer(record)}
            disabled={!permissions.includes("DISPLAY_PLAYLIST_EDIT")}
          />
        );
      },
    },
  ];
  function expandRowHandler(record) {
    return (
      <Row>
        <Button
          type="primary"
          onClick={() => showPlaylistDrawer(record.adminPlaylistTitles)}
        >
          Item
        </Button>
      </Row>
    );
  }

  return (
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
              getPlaylistsData(pageNumber, perPage);
            },
          }}
        ></Table>
      </Col>
      <Drawer
        open={open}
        title={edit ? `Edit Item (${edit?.name})` : "Create New Item"}
        onClose={() => closeDrawer()}
        placement="right"
        width={700}
        destroyOnClose="true"
      >
        {FormHandler()}
      </Drawer>
      <Drawer
        open={itemOpen}
        title="Create Playlist Item"
        onClose={() => closeItemDrawer()}
        placement="right"
        width={700}
        destroyOnClose="true"
      >
        <Form
          name="playlistItems"
          autoComplete="false"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={submitPlaylistItemHandler}
        >
          <Row gutter={16}>
            <Col span={20}>
              <Form.Item name="titles" label="Titles">
                <Select
                  mode="multiple"
                  onSearch={(value) => {
                    getTitleList(value);
                  }}
                  showSearch
                  filterOption={false}
                  onChange={handleChange}
                >
                  {titleLoading && (
                    <Select.Option disabled value="0">
                      <Row justify="center">
                        <Col>
                          <Spin spinning={titleLoading} />
                        </Col>
                      </Row>
                    </Select.Option>
                  )}

                  {titleList.map((title) => (
                    <Select.Option key={title.value} value={title.value}>
                      {title.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        {adminPlaylist.length > 1 ? (
          <Table
            rowKey={(e) => e.id}
            dataSource={adminPlaylist}
            columns={Playlistcolumns}
            loading={loading}

            // pagination={{
            //   total: paging.total,
            //   defaultCurrent: 1,
            //   defaultPageSize: 10,
            //   showSizeChanger: true,
            //   pageSizeOptions: [10, 20, 50],
            //   onChange: (pageNumber, perPage) => {
            //     getPlaylistsData(pageNumber, perPage);
            //   },
            // }}
          ></Table>
        ) : (
          "Ma shi buu"
        )}
      </Drawer>
      <ModalBody
        show={show}
        setShow={() => setShow(false)}
        onSelectItems={handleSelectGenreItems}
        titleId={handleChange}
      ></ModalBody>
    </Row>
  );
}
