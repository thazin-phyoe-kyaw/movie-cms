"use client";
import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
  Space,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { debounce } from "lodash";

import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import { errorMessage } from "@/lib/uiFunctions";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function SeriesForm({
  ROLES,
  CREDITS,
  TAGS,
  GENRES,
  edit,

  setFormOpen,
  setType,
  closeDrawer,
}) {
  const [form] = useForm();
  function checkImageType(file, imageType) {
    const isValidType = file.type.startsWith("image/");
    if (!isValidType) {
      message.error("You can only upload image files!");
    }
    return isValidType;
  }

  const handleUpload = (file, imageType) => {
    console.log(`Uploading ${file.name} as ${imageType}`);
  };
  const [genreId, setGenreId] = useState(
    edit?.genreTitles?.map((item) => item?.genreId)
  );

  const [tagId, setTagId] = useState(
    edit?.tagTitles?.map((item) => item?.tagId)
  );
  const [creditRoleID, setCreditRoleID] = useState(
    edit?.creditRoles?.map((item) => item)
  );
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [credits, setCredits] = useState([]);
  const [roles, setRoles] = useState([]);
  const [genreLoading, setGenreLoading] = useState(false);
  const [tagLoading, setTagLoading] = useState(false);
  const [creditLoading, setCreditLoading] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);
  const [isFormChange, setisFormChange] = useState(true);
  const [creditId, setCreditId] = useState([]);
  const [roleId, setRoleId] = useState([]);

  const handleFormChange = () => {
    const isFormChanged = form.isFieldsTouched();
    setisFormChange(isFormChanged);
  };
  function submitHandler({
    keywords,
    titleEn,
    titleMm,
    descriptionEn,
    descriptionMm,
    trailer,
    price,
    discountPrice,
    creditRoles,
  }) {
    setLoading(true);
    const creditRolesWithSorting = creditRoles?.map((item, index) => ({
      ...item,
      sorting: index,
    }));
    if (edit) {
      const oldGenreArray = edit.genreTitles.map((item) => item?.genreId);
      const addedGenres = genreId?.filter(
        (item) => !oldGenreArray.includes(item)
      );
      const newIds = genreId?.map((item) => item);
      const removedGenresId = oldGenreArray.filter(
        (id) => !newIds.includes(id)
      );
      const deleteGenreIds = removedGenresId.map((item) => {
        const match = edit.genreTitles.find((genre) => genre.genreId === item);
        return match ? match.id : null;
      });

      const oldTagArray = edit.tagTitles.map((item) => item?.tagId);
      const addedTags = tagId?.filter((item) => !oldTagArray.includes(item));
      const newTagIds = tagId.map((item) => item);
      const removedTagsId = oldTagArray.filter((id) => !newTagIds.includes(id));
      const deleteTagIds = removedTagsId.map((item) => {
        const match = edit.tagTitles.find((tag) => (tag.tagId = item));
        return match ? match.id : null;
      });

      const deleteCreditRoleID = edit.titleCredit.map((item) => item.id);
      const deleteCreditRoles = edit.creditRoles.map((item) => item.id);
      axios
        .post("/api/series/update", {
          id: edit.id,
          keywords,
          titleEn,
          titleMm,
          descriptionEn,
          descriptionMm,
          addedGenres: addedGenres,
          removedGenres: deleteGenreIds,
          addedTags: addedTags,
          removedTags: deleteTagIds,
          creditRoles: creditRolesWithSorting,
          removeCreditRoleId: deleteCreditRoleID,
          deleteCreditRoles,
        })
        .then((res) => closeDrawer(isFormChange))
        .catch((err) => errorMessage(err))
        .finally(() => setLoading(false));
    } else {
      axios
        .post("/api/series/create", {
          keywords,
          titleEn,
          titleMm,
          descriptionEn,
          descriptionMm,
          trailer,
          price,
          discountPrice,
          genre: genreId,
          tag: tagId,
          creditRoles: creditRolesWithSorting,
        })
        .then((res) => {
          closeDrawer(isFormChange);
        })
        .catch((err) => errorMessage(err))
        .finally(() => setLoading(false));
    }
  }
  function getGenreTitles(name) {
    setGenreLoading(true);
    axios
      .get(`/api/general/get_genre?name=${name}&pageNumber=1&perPage=15`)
      .then((res) => {
        setGenres(res.data.value);
        setGenreLoading(false);
      })
      .catch((err) => {
        errorMessage(err);
      });
  }
  function getRoleTitles(name) {
    setRoleLoading(true);
    axios
      .get(`/api/general/get_roles?name=${name}&pageNumber=1&perPage=15`)
      .then((res) => {
        setRoles(res.data.value);
        setRoleLoading(false);
      })
      .catch((err) => {
        errorMessage(err);
      });
  }
  function getTagTitles(name) {
    setTagLoading(true);
    axios
      .get(`/api/general/get_tags?name=${name}&pageNumber=1&perPage=15`)
      .then((res) => {
        setTags(res.data.value);
        setTagLoading(false);
      })
      .catch((err) => {
        errorMessage(err);
      });
  }
  function getCreditTitles(name) {
    setCreditLoading(true);
    axios
      .get(`/api/general/get_credits?name=${name}&pageNumber=1&perPage=15`)
      .then((res) => {
        setCredits(res.data.value);
        setCreditLoading(false);
      })
      .catch((err) => {
        errorMessage(err);
      });
  }
  const DraggableFormItem = ({
    name,
    index,
    moveItem,
    remove,
    ...restField
  }) => {
    const [, drag] = useDrag({
      type: "CREDIT_ROLE_ITEM",
      item: { index },
    });

    const [, drop] = useDrop({
      accept: "CREDIT_ROLE_ITEM",
      hover: (draggedItem) => {
        if (!draggedItem) {
          return;
        }
        const { index: draggedIndex } = draggedItem;
        if (draggedIndex !== index) {
          moveItem(draggedIndex, index);
        }
      },
    });

    return (
      <div
        ref={(node) => drag(drop(node))}
        style={{ width: "100%", marginTop: "20px" }}
      >
        <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
          <Form.Item
            name={[name, "creditId"]}
            {...restField}
            label="Credit"
            style={{ width: "580px" }}
          >
            <Select
              showSearch
              filterOption={false}
              onSearch={debounce((value) => {
                if (value.trim() === "") {
                  setCredits(CREDITS);
                  setSearch(false);
                } else {
                  setSearch(true);
                  getCreditTitles(value);
                }
              }, 1500)}
              onChange={(value) => setCreditId(value)}
              style={{ width: "100%" }}
            >
              {creditLoading && (
                <Select.Option disabled value="0">
                  <Row justify="center" gutter={[16, 16]}>
                    <Col>
                      <Spin creditLoading />
                    </Col>
                  </Row>
                </Select.Option>
              )}
              {search
                ? credits.map((credit) => (
                    <Select.Option key={credit.id} value={credit.id}>
                      {credit.nameMm}
                    </Select.Option>
                  ))
                : CREDITS?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.nameMm}
                    </Select.Option>
                  ))}
            </Select>
          </Form.Item>
          <div style={{ display: "flex" }}>
            <Form.Item
              label="Role"
              name={[name, "roleId"]}
              {...restField}
              style={{ width: "570px" }}
            >
              <Select
                showSearch
                filterOption={false}
                onSearch={debounce((value) => {
                  if (value.trim() === "") {
                    setRoles(ROLES);
                    setSearch(false);
                  } else {
                    setSearch(true);
                    getRoleTitles(value);
                  }
                }, 1500)}
                onChange={(value) => setRoleId(value)}
                style={{ width: "100%" }}
              >
                {roleLoading && (
                  <Select.Option disabled value="0">
                    <Row justify="center" gutter={[16, 16]}>
                      <Col>
                        <Spin roleLoading />
                      </Col>
                    </Row>
                  </Select.Option>
                )}
                {search
                  ? roles.map((role) => (
                      <Select.Option key={role.id} value={role.id}>
                        {role.nameMm}
                      </Select.Option>
                    ))
                  : ROLES?.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.nameMm}
                      </Select.Option>
                    ))}
              </Select>
            </Form.Item>
            <MinusCircleOutlined onClick={() => remove(name)} />
          </div>
        </Space>
      </div>
    );
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <Form
        name="title"
        autoComplete="false"
        initialValues={edit ? edit : " "}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={submitHandler}
        onFieldsChange={handleFormChange}
      >
        <Row>
          <Col span={12}>
            <Form.Item name="keywords" label="Keyword">
              <Input />
            </Form.Item>
            <Form.Item name="titleEn" label="English Title">
              <Input />
            </Form.Item>
            <Form.Item name="titleMm" label="Myanmar Title">
              <Input />
            </Form.Item>

            <Form.Item name="descriptionEn" label="En Description">
              <TextArea rows={3} />
            </Form.Item>
            <Form.Item name="descriptionMm" label="Mm Description">
              <TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="trailer" label="Trailer">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="discountPrice" label="Discount Price">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Row justify="end">
              <Col>
                <Button
                  type="primary"
                  size="small"
                  style={{ marginBottom: "10px" }}
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setFormOpen(true);
                    setType("genre");
                  }}
                >
                  Add New Genre
                </Button>
              </Col>
            </Row>
            <Form.Item name="genre" label="Genre">
              <Select
                mode="multiple"
                showSearch
                filterOption={false}
                onSearch={debounce((value) => {
                  if (value.trim() === "") {
                    setGenres(GENRES);
                    setSearch(false);
                  } else {
                    setSearch(true);
                    getGenreTitles(value);
                  }
                }, 1500)}
                onChange={(value) => setGenreId(value)}
              >
                {search
                  ? genres.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.nameMm}
                      </Select.Option>
                    ))
                  : GENRES?.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.nameMm}
                      </Select.Option>
                    ))}
                {genreLoading ? (
                  <Select.Option disabled value="loading">
                    <Row justify="center" gutter={[16, 16]}>
                      <Col>
                        <Spin />
                      </Col>
                    </Row>
                  </Select.Option>
                ) : null}
              </Select>
            </Form.Item>

            <Row justify="end">
              <Col>
                <Button
                  size="small"
                  type="primary"
                  icon={<PlusOutlined />}
                  style={{ marginBottom: "10px" }}
                  onClick={() => {
                    setFormOpen(true);
                    setType("tag");
                  }}
                >
                  Add New Tag
                </Button>
              </Col>
            </Row>
            <Form.Item name="tag" label="Tag">
              <Select
                mode="multiple"
                showSearch
                filterOption={false}
                onSearch={debounce((value) => {
                  if (value.trim() === "") {
                    setTags(TAGS);
                    setSearch(false);
                  } else {
                    setSearch(true);
                    getTagTitles(value);
                  }
                }, 1500)}
                onChange={(value) => setTagId(value)}
              >
                {search
                  ? tags.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.nameMm}
                      </Select.Option>
                    ))
                  : TAGS?.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.nameMm}
                      </Select.Option>
                    ))}
                {tagLoading ? (
                  <Select.Option disabled value="loading">
                    <Row justify="center" gutter={[16, 16]}>
                      <Col>
                        <Spin />
                      </Col>
                    </Row>
                  </Select.Option>
                ) : null}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={12}>
                <Row justify="end">
                  <Button
                    size="small"
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{ marginBottom: "10px" }}
                    onClick={() => {
                      setFormOpen(true);
                      setType("credit");
                    }}
                  >
                    Add New Credit
                  </Button>
                </Row>
              </Col>

              <Col span={12}>
                <Row justify="end">
                  <Col>
                    <Button
                      type="primary"
                      size="small"
                      style={{ marginBottom: "10px" }}
                      icon={<PlusOutlined />}
                      onClick={() => {
                        setFormOpen(true);
                        setType("role");
                      }}
                    >
                      Add New Role
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Form.List name="creditRoles">
              {(fields, { add, remove, move }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <DraggableFormItem
                      key={key}
                      name={name}
                      index={index}
                      moveItem={(dragIndex, hoverIndex) => {
                        move(dragIndex, hoverIndex);
                      }}
                      remove={() => remove(index)}
                      {...restField}
                    />
                  ))}
                  <Form.Item
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      marginLeft: "50px",
                    }}
                  >
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      style={{
                        display: "block",
                      }}
                    >
                      Add Credit Role
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </Row>
        <Row>
          <Col>
            <Upload
              beforeUpload={(file) => checkImageType(file, "PosterLandscape")}
              customRequest={({ file }) =>
                handleUpload(file, "PosterLandscape")
              }
            >
              <Button icon={<UploadOutlined />}>Upload Poster Landscape</Button>
            </Upload>
          </Col>
          <Col>
            <Upload
              beforeUpload={(file) => checkImageType(file, "PosterPortrait")}
              customRequest={({ file }) => handleUpload(file, "PosterPortrait")}
            >
              <Button icon={<UploadOutlined />}>Upload Poster Portrait</Button>
            </Upload>
          </Col>
          <Col>
            <Upload
              beforeUpload={(file) => checkImageType(file, "Thumbnail")}
              customRequest={({ file }) => handleUpload(file, "Thumbnail")}
            >
              <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
            </Upload>
          </Col>
          <Col>
            <Upload
              beforeUpload={(file) => checkImageType(file, "CoverImage")}
              customRequest={({ file }) => handleUpload(file, "CoverImage")}
            >
              <Button icon={<UploadOutlined />}>Upload Cover Image</Button>
            </Upload>
          </Col>
        </Row>
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
    </DndProvider>
  );
}

export default SeriesForm;
