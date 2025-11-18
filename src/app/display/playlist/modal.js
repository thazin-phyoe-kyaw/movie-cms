"use client";
import { SElECT_TYPE } from "@/lib/const";
import { errorMessage } from "@/lib/uiFunctions";
import axios from "axios";
import { Form, Select, Row, Col, Spin, Table, Button, Drawer } from "antd";
import { useState } from "react";
import { debounce } from "lodash";
export default function ModalBody({ show, setShow, onSelectItems, titleId }) {
  const [type, setType] = useState("");
  const [genreLoading, setGenreLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [genreTitleList, setGenreTitleList] = useState("");
  const [tags, setTags] = useState([]);
  const [tagLoading, setTagLoading] = useState(false);
  const [tagTitleLoading, setTagTitleLoading] = useState(false);
  const lists = genreTitleList[0]?.genreTitles;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const data = lists?.map((item) => {
    return {
      id: item.title.id,
      type: item.title.type,
      titleMm: item.title.titleMm,
    };
  });
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleSelect = () => {
    titleId(selectedRowKeys);
    onSelectItems(selectedRowKeys);
    setShow(false);
  };
  function getGenreList(name) {
    setGenreLoading(true);
    axios
      .get(`/api/general/get_genre?name=${name}&pageNumber=1&perPage=15`)
      .then((res) => {
        setGenres(res.data.value);
      })
      .catch((err) => {
        errorMessage(err);
      })
      .finally(() => setGenreLoading(false));
  }

  function getGenreTitle(e) {
    setLoading(true);
    axios

      .get(`/api/general/get_genreTitle?id=${e}&pageNumber=1,perPage=10`)
      .then((res) => setGenreTitleList(res.data.value))
      .catch((err) => errorMessage(err))
      .finally(() => setLoading(false));
  }
  function getTagList(name) {
    setTagLoading(true);
    axios
      .get(`/api/general/get_tag?name=${name}&pageNumber=1&perPage=15`)
      .then((res) => {
        setTags(res.data.value);
      })
      .catch((err) => {
        errorMessage(err);
      })
      .finally(() => setTagLoading(false));
  }
  function getTagTitle(e) {
    setLoading(true);
    axios

      .get(`/api/general/get_genreTitle?id=${e}&pageNumber=1,perPage=10`)
      .then((res) => setGenreTitleList(res.data.value))
      .catch((err) => errorMessage(err))
      .finally(() => setLoading(false));
  }

  const columns = [
    {
      title: "Name",
      key: "id",
      dataIndex: "titleMm",
    },
    {
      title: "Type",
      key: "id",
      dataIndex: "type",
    },
  ];

  return (
    <Drawer
      open={show}
      onClose={setShow}
      footer={null}
      closable={false}
      placement="right"
      width="700px"
      destroyOnClose
    >
      <Form
        name="name"
        autoComplete="false"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              name="choose"
              label="Choose One"
              rules={[
                {
                  required: false,
                  message: "Select something",
                },
              ]}
            >
              <Select onChange={(type) => setType(type)}>
                {SElECT_TYPE.map((type) => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            {type === "genre" ? (
              <Form.Item
                name="genre"
                label="Genre"
                rules={[
                  {
                    required: false,
                    message: "Genre is Required",
                  },
                ]}
              >
                <Select
                  onSearch={debounce((value) => {
                    getGenreList(value);
                  }, 1500)}
                  onChange={(e) => getGenreTitle(e)}
                  showSearch
                  filterOption={false}
                >
                  {genreLoading && (
                    <Select.Option disabled value="0">
                      <Row justify="center" gutter={[16, 16]}>
                        <Col>
                          <Spin loading />
                        </Col>
                      </Row>
                    </Select.Option>
                  )}
                  {genres?.map((title) => (
                    <Select.Option key={title.id} value={title.id}>
                      {title.nameMm}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            ) : (
              <Form.Item
                name="tag"
                label="Tag"
                rules={[
                  {
                    required: false,
                    message: "Tag is Required",
                  },
                ]}
              >
                <Select
                  onSearch={debounce((value) => {
                    getTagList(value);
                  }, 1500)}
                  onChange={(e) => getTagTitle(e)}
                  showSearch
                  filterOption={false}
                >
                  {tagLoading && (
                    <Select.Option disabled value="0">
                      <Row justify="center" gutter={[16, 16]}>
                        <Col>
                          <Spin loading />
                        </Col>
                      </Row>
                    </Select.Option>
                  )}
                  {tags?.map((title) => (
                    <Select.Option key={title.id} value={title.titleMm}>
                      {title.titleMm}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowSelection={rowSelection}
          rowKey={(record) => record.id}
        ></Table>
        <Button type="primary" onClick={() => handleSelect()}>
          Select
        </Button>
      </Form>
    </Drawer>
  );
}
