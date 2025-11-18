"use client";
import CreditForm from "@/components/Content/CreditForm";
import GenreForm from "@/components/Content/GenreForm";
import RoleForm from "@/components/Content/RoleForm";
import { errorMessage } from "@/lib/uiFunctions";
import { EditOutlined } from "@ant-design/icons";

import {
  Button,
  Row,
  Space,
  Table,
  Col,
  Drawer,
  Typography,
  Collapse,
  Divider,
  Tag,
  Card,
} from "antd";
import axios from "axios";
import { useState } from "react";
import TagForm from "@/components/Content/TagForm";

import SeriesForm from "@/components/Content/SeriesForm";
import Seasons from "@/components/Content/Seasons";
import SearchHandler from "@/lib/searchHandler";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_SERIES_CONST } from "@/lib/queryConst";
import Link from "next/link";
export default function SeriesBody({
  permissions,
  preData,
  GENRES,
  TAGS,
  CREDITS,
  ROLES,
}) {
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: preData?.count,
  });
  const [data, setData] = useState(preData.value);
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState(QUERY_SERIES_CONST.filter);
  const [order, setOrder] = useState(QUERY_SERIES_CONST.order);
  const [formOpen, setFormOpen] = useState(false);
  const [type, setType] = useState(false);
  const [showSeasonDrawer, setShowSeasonDrawer] = useState(false);
  const [seriesId, setSeriesId] = useState("");
  const [edit, setEdit] = useState(null);
  function seriesDreawerHandler(open, id) {
    setShowSeasonDrawer(open);
    setSeriesId(id);
  }
  function closeForm() {
    setFormOpen(false);
  }
  const columns = [
    {
      title: "Keywords",
      dataIndex: "keywords",
    },
    {
      title: "EN Title",
      dataIndex: "titleEn",
    },
    {
      title: "MM Title",
      dataIndex: "titleMm",
    },

    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Resolution",
      dataIndex: "resolution",
    },
    {
      title: "Seasons",
      dataIndex: "seasons",
      align: "right",
      render: (_, record) => {
        return (
          <Link
            href={{
              pathname: "/content/series/seasons",
              query: { seriesId: record.id },
            }}
          >
            Seasons
          </Link>
        );
      },
    },
    // {
    //   title: "Season",
    //   dataIndex: "actions",
    //   align: "right",
    //   render: (_, record) => {
    //     return (
    //       <Space>
    //         <Button
    //           type="primary"
    //           onClick={() => seriesDreawerHandler(true, record.id)}
    //         >
    //           View Seasons
    //         </Button>
    //       </Space>
    //     );
    //   },
    // },
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
              onClick={() => showDrawer(record)}
            />
          </Space>
        );
      },
    },
  ];
  function expandRowHandler(record) {
    return (
      <Row>
        <Col span={24}>
          <Card>
            <Row gutter={32}>
              <Col span={16}>
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
                  <Col span={6}>Publish Date</Col>
                  <Col span={18}>
                    <Typography>{record.Series?.publishDate}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>Start Date</Col>
                  <Col span={18}>
                    <Typography>{record.Series?.startDate}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>Expire Date</Col>
                  <Col span={18}>
                    <Typography>{record.Series?.expireDate}</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>Trailer</Col>
                  <Col span={18}>
                    <a href={record.Series?.trailer}>
                      {record.Series?.trailer}
                    </a>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}> Price</Col>
                  <Col span={18}>
                    <Typography>{record.Series?.price}</Typography>
                  </Col>
                </Row>

                <Row>
                  <Col span={6}>Discount Price</Col>
                  <Col span={18}>
                    <Typography>{record?.Series?.discountPrice}</Typography>
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Collapse
                  items={[
                    {
                      key: "1",
                      label: "Tags",
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
                          {record.titleCredit.map((credit) => (
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
        </Col>
        {/* <Seasons record={{ ...record }} permissions={permissions}></Seasons> */}
      </Row>
    );
  }

  function showDrawer(data) {
    if (data) {
      const modifiedData = {
        ...data,
        price: data?.Series?.price,
        discountPrice: data?.Series?.discountPrice,
        trailer: data?.Series?.trailer,
        genre: data?.genreTitles?.map((data) => data?.genreId),
        tag: data.tagTitles?.map((data) => data?.tag?.id),

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

  function closeDrawer(isFormChange) {
    if (isFormChange === undefined) {
      setShow(false);
      setEdit("");
    } else {
      setShow(false);
      setEdit("");
      getData(paging.pageNumber, paging.perPage, filter);
    }
  }

  async function getData(pageNumber, perPage, updatedFilter = filter) {
    setLoading(true);
    axios
      .get(
        `/api/series/get?${await apiQueryHandler(
          QUERY_SERIES_CONST,
          updatedFilter,
          order,
          QUERY_SERIES_CONST.fields,
          "normal",
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

  function publishSerie(id, publish) {
    setLoading(true);
    axios
      .post("/api/series/delete", { id, publish })
      .then((res) => {
        getData(paging.pageNumber, paging.perPage, filter);
      })
      .catch((err) => errorMessage(err));
  }
  function FormHandler() {
    return (
      <SeriesForm
        edit={edit}
        ROLES={ROLES}
        GENRES={GENRES}
        TAGS={TAGS}
        CREDITS={CREDITS}
        loading={loading}
        setFormOpen={setFormOpen}
        setType={setType}
        closeDrawer={closeDrawer}
      />
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
        title={edit ? "Edit  Title" : "Create Title"}
        placement="right"
        onClose={() => closeDrawer()}
        open={show}
        width="90%"
        destroyOnClose
      >
        {FormHandler()}
      </Drawer>
      <Drawer
        title="Seasons"
        placement="right"
        onClose={() => setShowSeasonDrawer(false)}
        visible={showSeasonDrawer}
        width="90%"
        destroyOnClose
      >
        <Seasons permissions={permissions} seriesId={seriesId} />
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
                return <RoleForm closeForm={closeForm} />;
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
        "NO FORM"
      )}
    </div>
  );
}
