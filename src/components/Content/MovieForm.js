"use client";
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
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { debounce } from "lodash";
import React, { useState } from "react";
import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function MovieForm({
  ROLES,
  edit,
  GENRES,
  TAGS,
  CREDITS,

  setFormOpen,
  setType,
  closeDrawer,
}) {
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(
    edit?.genreTitles?.map((item) => item?.genreId)
  );
  const [roleId, setRoleId] = useState(
    edit?.roleTitles?.map((item) => item?.roleId)
  );
  const [selectedTagIds, setSelectedTagIds] = useState(
    edit?.tagTitles?.map((item) => item?.tagId) || []
  );
  const [selectedGenresIds, setSelectedGenreIds] = useState(
    edit?.genreTitles?.map((item) => item?.genreId) || []
  );
  const [tag, setTag] = useState(edit?.tagTitles?.map((item) => item?.tagId));

  const [creditRoleID, setCreditRoleID] = useState(
    edit?.creditRoles?.map((item, index) => ({ ...item, sorting: index })) || []
  );

  const [search, setSearch] = useState(false);
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [credits, setCredits] = useState([]);
  const [roles, setRoles] = useState([]);
  const [genreLoading, setGenreLoading] = useState(false);
  const [tagLoading, setTagLoading] = useState(false);
  const [creditLoading, setCreditLoading] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);
  const [form] = useForm();
  const [isFormChange, setisFormChange] = useState(true);
  const [creditId, setCreditId] = useState([]);
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

  const handleFormChange = () => {
    const isFormChanged = form.isFieldsTouched();
    setisFormChange(isFormChanged);
  };
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
  function submitHandler({
    titleMm,
    titleEn,
    keywords,
    descriptionEn,
    descriptionMm,
    duration,
    fullHdFileSize,
    hdFileSize,
    sdFileSize,
    trailer,
    streamingUrl,
    downloadUrl,
    price,
    discountPrice,
    creditRoles,
  }) {
    setLoading(true);
    const creditRolesWithSorting = creditRoles
      ?.filter((item) => item.creditId && item.roleId)
      .map((item, index) => ({
        ...item,
        sorting: index,
      }));
    if (edit) {
      const oldGenreArray = edit.genreTitles.map((item) => item?.genreId);
      const addedGenres = selectedGenresIds?.filter(
        (item) => !oldGenreArray.includes(item)
      );
      const newIds = selectedGenresIds.map((item) => item);
      const removedGenresId = oldGenreArray.filter(
        (id) => !newIds.includes(id)
      );
      const deleteGenreIds = removedGenresId.map((item) => {
        const match = edit.genreTitles.find((genre) => genre.genreId === item);
        return match ? match.id : null;
      });

      const oldTagArray = edit.tagTitles.map((item) => item?.tagId);
      const addedTags = selectedTagIds?.filter(
        (item) => !oldTagArray.includes(item)
      );
      const newTagIds = selectedTagIds.map((item) => item);
      const removedTagsId = oldTagArray.filter((id) => !newTagIds.includes(id));
      const deleteTagIds = removedTagsId.map((item) => {
        const match = edit.tagTitles.find((tag) => tag.tagId === item);
        return match ? match.id : null;
      });

      const deleteCreditRoleID = edit.titleCredit.map((item) => item.id);
      const deleteCreditRoles = edit.creditRoles.map((item) => item.id);

      const tagIds = selectedTagIds;
      const genreIds = selectedGenresIds;
      axios
        .post("/api/movie/update", {
          id: edit.id,
          titleMm,
          titleEn,
          keywords,
          descriptionEn,
          descriptionMm,
          duration,
          fullHdFileSize,
          hdFileSize,
          sdFileSize,
          trailer,
          streamingUrl,
          downloadUrl,
          price,
          discountPrice,
          addedGenres: addedGenres,
          removedGenres: deleteGenreIds,
          addedTags: addedTags,
          removedTags: deleteTagIds,
          creditRoles: creditRolesWithSorting,
          removeCreditRoleId: deleteCreditRoleID,
          deleteCreditRoles,
          tag: tagIds,
          genre: genreIds,
        })
        .then((res) => closeDrawer(isFormChange))
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    } else {
      axios
        .post("/api/movie/create", {
          titleMm,
          titleEn,
          keywords,
          descriptionEn,
          descriptionMm,
          duration,
          fullHdFileSize,
          hdFileSize,
          sdFileSize,
          trailer,
          streamingUrl,
          downloadUrl,
          price,
          discountPrice,
          genre: selectedGenresIds,
          tag: selectedTagIds,
          creditRoles: creditRolesWithSorting,
        })
        .then((res) => closeDrawer(isFormChange))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
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
        <Row>
          <Col span={12}>
            <Form.Item name={[name, "creditId"]} {...restField} label="Credit">
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
          </Col>
          <Col span={12}>
            <Row justify={"space-between"}>
              <Col span={20}>
                <Form.Item
                  labelCol={{ span: 9 }}
                  label="Role"
                  name={[name, "roleId"]}
                  {...restField}
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
              </Col>
              <Col span={2}>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Form
        name="roles"
        autoComplete="false"
        initialValues={{
          ...edit,
          tag: selectedTagIds,
          genre: selectedGenresIds,
        }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={(values) => submitHandler({ ...values, tag, genre })}
        onFieldsChange={handleFormChange}
      >
        <Row>
          <Col span={24}>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="titleEn"
                  label="English Title"
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
                  name="titleMm"
                  label="Myanmar Title"
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
                  name="descriptionEn"
                  label="EN Description"
                  rules={[
                    {
                      required: false,
                      message: "Description is required",
                    },
                  ]}
                >
                  <TextArea rows={3} />
                </Form.Item>
                <Form.Item
                  name="descriptionMm"
                  label="MM Description"
                  rules={[
                    {
                      required: false,
                      message: "Description  is required",
                    },
                  ]}
                >
                  <TextArea rows={3} />
                </Form.Item>
                <Form.Item name="streamingUrl" label="Streaming URL">
                  <Input />
                </Form.Item>
                <Form.Item name="downloadUrl" label="Download URL">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="keywords"
                  label="Keyword"
                  rules={[
                    {
                      required: false,
                      message: "Keyword is required",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item name="duration" label="Duration">
                  <Input />
                </Form.Item>
                <Form.Item name="trailer" label="Trailer">
                  <Input />
                </Form.Item>

                <Form.Item name="price" label="Price">
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item name="discountPrice" label="Discount Price">
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item name="fullHdFileSize" label="Full  HD Filesize">
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item name="hdFileSize" label="HD Filesize">
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item name="sdFileSize" label="SD Filesize">
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
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
                        setType("genre");
                      }}
                    >
                      Add New Genre
                    </Button>
                  </Col>
                </Row>

                <Form.Item
                  name="genre"
                  label="Genre"
                  initialValue={edit?.genre}
                >
                  <Select
                    mode="multiple"
                    showSearch
                    labelInValue
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
                    onChange={(selectedGenre) => {
                      setSelectedGenreIds(
                        selectedGenre.map((genre) => genre.value)
                      );
                    }}
                  >
                    {search
                      ? genres.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.nameMm}
                          </Select.Option>
                        ))
                      : GENRES.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.nameMm}
                          </Select.Option>
                        ))}
                    {genreLoading && (
                      <Select.Option disabled value="0">
                        <Row justify="center" gutter={[16, 16]}>
                          <Col>
                            <Spin />
                          </Col>
                        </Row>
                      </Select.Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
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
                <Form.Item name="tag" label="Tag" initialValue={edit?.tag}>
                  <Select
                    mode="multiple"
                    showSearch
                    filterOption={false}
                    labelInValue
                    onSearch={debounce((value) => {
                      if (value.trim() === "") {
                        setTags(TAGS);
                        setSearch(false);
                      } else {
                        setSearch(true);
                        getTagTitles(value);
                      }
                    }, 1500)}
                    onChange={(selectedTag) => {
                      setSelectedTagIds(selectedTag.map((tag) => tag.value));
                    }}
                  >
                    {search
                      ? tags.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.nameMm}
                          </Select.Option>
                        ))
                      : TAGS.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.nameMm}
                          </Select.Option>
                        ))}
                    {tagLoading && (
                      <Select.Option disabled value="0">
                        <Row justify="center" gutter={[16, 16]}>
                          <Col>
                            <Spin />
                          </Col>
                        </Row>
                      </Select.Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            style={{
              marginTop: "20px",
              paddingTop: "20px",
              borderTop: "1px solid #d9d9d9",
            }}
          >
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
                <Row justify={"end"}>
                  <Col span={24}>
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
                  </Col>

                  <Col>
                    <Form.Item>
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Add Credit Role
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              )}
            </Form.List>
          </Col>
          <Col
            span={24}
            style={{
              marginTop: "20px",
              paddingTop: "20px",
              borderTop: "1px solid #d9d9d9",
            }}
          >
            <Row>
              {/* <Col span={6}>
                <Upload
                  beforeUpload={(file) =>
                    checkImageType(file, "PosterLandscape")
                  }
                  customRequest={({ file }) =>
                    handleUpload(file, "PosterLandscape")
                  }
                >
                  <Button icon={<UploadOutlined />}>
                    Upload Poster Landscape
                  </Button>
                </Upload>
              </Col> */}
              {/* <Col>
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
          </Col> */}
            </Row>
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

export default MovieForm;
