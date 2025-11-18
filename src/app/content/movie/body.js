"use client";

import { errorMessage } from "@/lib/uiFunctions";
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Row,
  Space,
  Table,
  Col,
  Drawer,
  Card,
  Typography,
  Collapse,
  Divider,
  Tag,
} from "antd";
import axios from "axios";
import { useState } from "react";
import GenreForm from "@/components/Content/GenreForm";
import RoleForm from "@/components/Content/RoleForm";
import CreditForm from "@/components/Content/CreditForm";
import TagForm from "@/components/Content/TagForm";
import MovieForm from "@/components/Content/MovieForm";

import _ from "lodash";
import SearchHandler from "@/lib/searchHandler";
import { QUERY_MOVIE_CONST } from "@/lib/queryConst";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
export default function MovieBody({
  ROLES,
  permissions,
  preData,
  GENRES,
  TAGS,
  CREDITS,
}) {
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: preData?.count,
  });
  const [data, setData] = useState(preData.value);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [type, setType] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editGenre, setEditGenre] = useState([]);
  const [filter, setFilter] = useState(QUERY_MOVIE_CONST.filter);
  const [order, setOrder] = useState(QUERY_MOVIE_CONST.order);
  const columns = [
    {
      title: "Keywords",
      dataIndex: "keywords",
    },
    {
      title: "MM Name",
      dataIndex: "titleMm",
    },
    {
      title: "EN Name",
      dataIndex: "titleEn",
    },
    {
      title: "Resolution",
      dataIndex: "resolution",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      align: "right",
      render: (_, record) => {
        return (
          <Space>
            <Button
              style={{
                background: record.status ? "#2bba3e" : "#cf3e43",
                color: "white",
              }}
              onClick={() => publishSerie(record.id, record.status)}
            >
              {record.status ? "isActive" : "inActive"}
            </Button>
            <Button
              type="primary"
              icon={<EditOutlined />}
              disabled={!permissions.includes("CONTENT_ROlE_EDIT")}
              onClick={() => showDrawer(record)}
            />
          </Space>
        );
      },
    },
  ];

  function expandRowHandler(record) {
    return (
      <Card>
        <Row>
          <Col span={12}>
            <Row>
              <Col span={6}>Mm Description:</Col>
              <Col span={18}>
                <Typography>{record.descriptionMm}</Typography>
              </Col>
            </Row>
            <Row>
              <Col span={6}>En Description:</Col>
              <Col span={18}>
                <Typography>{record.descriptionEn}</Typography>
              </Col>
            </Row>
            <Row>
              <Col span={6}>Duration</Col>
              <Col span={18}>
                <Typography>{record.Movie?.duration}</Typography>
              </Col>
            </Row>
            <Row>
              <Col span={6}>Publish Date</Col>
              <Col span={18}>
                <Typography>{record.Movie?.publishDate}</Typography>
              </Col>
            </Row>
            <Row>
              <Col span={6}>Start Date</Col>
              <Col span={18}>
                <Typography>{record.Movie?.startDate}</Typography>
              </Col>
            </Row>
            <Row>
              <Col span={6}>Expire Date</Col>
              <Col span={18}>
                <Typography>{record.Movie?.expireDate}</Typography>
              </Col>
            </Row>
            <Row>
              <Col span={6}>Streaming URL</Col>
              <Col span={18}>
                <a href={record.Movie?.streamingUrl}>
                  {record.Movie?.streamingUrl}
                </a>
              </Col>
            </Row>
            <Row>
              <Col span={6}>Download Url</Col>
              <Col span={18}>
                <a href={record.Movie?.downloadUrl}>
                  {record.Movie?.downloadUrl}
                </a>
              </Col>
            </Row>
            <Row>
              <Col span={6}>Trailer</Col>
              <Col span={18}>
                <a href={record.Movie?.trailer}>{record.Movie?.trailer}</a>
              </Col>
            </Row>
            <Row>
              <Col span={6}>Full HD File Size</Col>
              <Col span={18}>
                <Typography>{record.Movie?.fullHdFileSize}</Typography>
              </Col>
            </Row>
            <Row>
              <Col span={6}> HD File Size</Col>
              <Col span={18}>
                <Typography>{record.Movie?.hdFileSize}</Typography>
              </Col>
            </Row>
            <Row>
              <Col span={6}>SD File Size</Col>
              <Col span={18}>
                <Typography>{record.Movie?.sdFileSize}</Typography>
              </Col>
            </Row>
            <Row>
              <Col span={6}> Price</Col>
              <Col span={18}>
                <Typography>{record.Movie?.price}</Typography>
              </Col>
            </Row>
            <Row>
              <Col span={6}>Discount Price</Col>
              <Col span={18}>
                <Typography>{record.Movie?.discountPrice}</Typography>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Collapse
              items={[
                {
                  key: "1",
                  label: "Tags",
                  children: (
                    <div>
                      {record.tagTitles?.map((tag) => (
                        <Typography>{tag.tag?.nameMm}</Typography>
                      ))}
                    </div>
                  ),
                },
              ]}
            />
            <Divider />
            <Collapse
              items={[
                {
                  key: "1",
                  label: "Genres",
                  children: (
                    <div>
                      {record.genreTitles?.map((genre) => (
                        <Typography>{genre.genre?.nameMm}</Typography>
                      ))}
                    </div>
                  ),
                },
              ]}
            />
            <Divider />
            <Collapse
              items={[
                {
                  key: "1",
                  label: "Credits",
                  children: (
                    <div>
                      {record.titleCredit?.map((credit) => (
                        <Row style={{ marginBottom: "10px" }}>
                          <Col span={12}>
                            <Typography>
                              {credit.CreditRole?.credit?.nameMm}
                            </Typography>
                          </Col>
                          <Col span={12}>
                            <Tag color="#2db7f5">
                              {credit.CreditRole?.role?.nameMm}
                            </Tag>
                          </Col>
                        </Row>
                      ))}
                    </div>
                  ),
                },
              ]}
            />
          </Col>
        </Row>
      </Card>
    );
  }
  function publishSerie(id, publish) {
    setLoading(true);
    axios
      .post("/api/movie/publish", { id, publish })
      .then((res) => {
        getData(paging.pageNumber, paging.perPage);
      })
      .catch((err) => console.log(err));
  }
  function closeForm() {
    setFormOpen(false);
  }

  function showDrawer(data) {
    if (data) {
      setEditGenre(data.genreTitles);
      const modifiedData = {
        ...data,
        discountPrice: data?.Movie?.discountPrice,
        downloadUrl: data?.Movie?.downloadUrl,
        duration: data?.Movie?.duration,
        streamingUrl: data?.Movie?.streamingUrl,
        trailer: data?.Movie?.trailer,
        price: data?.Movie?.price,
        fullHdFileSize: data?.Movie?.fullHdFileSize,
        hdFileSize: data?.Movie?.hdFileSize,
        sdFileSize: data?.Movie?.sdFileSize,
        genre: data?.genreTitles?.map((data) => data?.genre?.id),
        // tag: data.tagTitles?.map((data) => data?.tag?.id),
        tag: data.tagTitles?.map((data) => ({
          name: data?.tag?.nameMm,
          id: data?.tag?.id,
        })),
        creditRoles: data?.titleCredit
          ?.map((item) => ({
            roleId: item.CreditRole.roleId,
            creditId: item.CreditRole.creditId,
            id: item.CreditRole.id,
            sorting: item.CreditRole.sorting,
          }))
          .sort((a, b) => a.sorting - b.sorting),
      };

      setEdit(modifiedData);
    }
    setShow(true);
  }

  async function getData(pageNumber, perPage, updatedFilter = filter) {
    setLoading(true);
    axios
      .get(
        `/api/movie/get?${await apiQueryHandler(
          QUERY_MOVIE_CONST,
          updatedFilter,
          order,
          QUERY_MOVIE_CONST.fields,
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

  function closeDrawer(isFormChange) {
    if (isFormChange === undefined) {
      setShow(false);
      setEdit("");
    } else {
      setShow(false);
      setEdit("");

      getData(paging.pageNumber, paging.perPage);
    }
  }
  function FormHandler() {
    return (
      <MovieForm
        edit={edit}
        GENRES={GENRES}
        TAGS={TAGS}
        CREDITS={CREDITS}
        loading={loading}
        setFormOpen={setFormOpen}
        ROLES={ROLES}
        setType={setType}
        closeDrawer={closeDrawer}
      ></MovieForm>
    );
  }
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row justify="space-between" align="center" gutter={16}>
            <Col span={24} flex="auto">
              <SearchHandler
                filter={filter}
                setFilter={setFilter}
                order={order}
                setOrder={setOrder}
                pagination={paging}
                apiHandler={getData}
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
            rowKey={(e) => e.id}
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
                getData(pageNumber, perPage);
              },
            }}
            expandable={{
              rowExpandable: (record) => true,
              expandedRowRender: (record) => expandRowHandler(record),
            }}
          ></Table>
        </Col>
      </Row>
      <Drawer
        title={edit ? "Edit Movie" : "Create Movie"}
        placement="right"
        onClose={() => closeDrawer()}
        open={show}
        width="90%"
        destroyOnClose
      >
        {FormHandler()}
      </Drawer>
      {formOpen ? (
        <Drawer
          placement="right"
          onClose={() => setFormOpen(false)}
          open={formOpen}
          width="700"
          destroyOnClose
        >
          {(() => {
            switch (type) {
              case "genre":
                return <GenreForm closeForm={closeForm} />;
              case "role":
                return <RoleForm closeForm={closeForm} loading={loading} />;
              case "credit":
                return <CreditForm closeForm={closeForm} />;
              case "tag":
                return <TagForm closeForm={closeForm} />;
              default:
                return null;
            }
          })()}
        </Drawer>
      ) : (
        "Thre is no Form with that name"
      )}
    </div>
  );
}
