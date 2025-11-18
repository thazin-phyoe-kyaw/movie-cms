"use client";
import { nextQueryHandler } from "@/lib/globalFunctions";
import { errorMessage } from "@/lib/uiFunctions";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Drawer,
  Form,
  Input,
  Popconfirm,
  Row,
  Table,
  Tooltip,
  Typography,
  message,
} from "antd";
import axios from "axios";

import React, { useState } from "react";
import PromocodeUser from "./promocodeuser";
import moment from "moment";
import PromocodeService from "@/components/PromoCode/PromocodeService";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_PROMOCODE_CONST } from "@/lib/queryConst";
import SearchHandler from "@/lib/searchHandler";
const { RangePicker } = DatePicker;
const { Text } = Typography;

export default function Promocode({ permissions, data }) {
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: data.total,
  });

  const [promocodes, setPromcodes] = useState(data.value);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const [showDrawer, setShowDrawer] = useState(false);
  const [titleList, setTitleList] = useState([]);
  const [titleLoading, setTitleLoading] = useState(false);
  const [detailDrawer, setDetailDrawer] = useState(false);
  const [episodeLoading, setEpisodeLoading] = useState(false);
  const [episodeList, setEpisodeList] = useState([]);

  const [detail, setDetail] = useState(false);

  const [filter, setFilter] = useState(QUERY_PROMOCODE_CONST.filter);
  const [order, setOrder] = useState(QUERY_PROMOCODE_CONST.order);

  function showDetail(data) {
    setDetail(data);
    setDetailDrawer(true);
  }
  function closeDetail() {
    setDetailDrawer(false);
    setDetail(false);
  }
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

  function getEpisodeList(name) {
    setEpisodeLoading(true);
    axios
      .get(
        `/api/general/get_episode_by_name?name=${name}&pageNumber=1&perPage=15`
      )
      .then(({ data }) => {
        let episodeData = [];

        if (
          data.value[0].Series &&
          data.value[0].Series.seasons &&
          data.value[0].Series.seasons.length > 0
        ) {
          const seasons = data.value[0].Series.seasons;

          for (const season of seasons) {
            const seasonName = season.nameMm;
            const episodes = season.episodes.map((episode) => ({
              label: episode.titleMm,
              value: episode.id,
            }));

            episodeData.push({
              name: seasonName,
              episodes,
            });
          }
        }

        setEpisodeList([...episodeData]);
      })
      .catch((err) => {
        errorMessage(err);
      })
      .finally(() => setEpisodeLoading(false));
  }
  function openDrawer(data) {
    if (data) {
      setEdit(data);
      setShowDrawer(true);
    } else {
      setShowDrawer(true);
    }
  }
  function closeDrawer() {
    setShowDrawer(false);
    setEdit(false);
  }

  function deleteUser(id) {
    setLoading(true);
    axios
      .post("/api/promocode/delete", { id })
      .then(() => {
        getDataList(paging.pageNumber, paging.perPage);
      })
      .catch((err) => errorMessage(err));
  }

  async function getDataList(pageNumber, perPage, updatedFilter = filter) {
    setLoading(true);
    axios
      .get(
        `/api/promocode/get_list?${await apiQueryHandler(
          QUERY_PROMOCODE_CONST,
          updatedFilter,
          order,
          QUERY_PROMOCODE_CONST.fields,
          "normal",
          {
            pageNumber,
            perPage,
          }
        )}`
      )
      .then(({ data: result }) => {
        if (result.value.length < 1) {
          message.warning("No found");
        }
        setPaging({
          pageNumber,
          perPage,
          total: result["@odata.count"],
        });
        setPromcodes(result.value);
      })
      .catch((error) => {
        errorMessage(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const disabledStartDate = (current) => {
    return current && current < moment().startOf("day");
  };

  function submitHandler(values) {
    const { eventDate, ...otherData } = values;
    const [startDate, endDate] = eventDate;
    if (!edit) {
      setLoading(true);
      axios
        .post("/api/promocode/create", {
          titleId: otherData.titleId,
          episodeId: otherData.episodeId,
          name: otherData.name,
          description: otherData.description,
          startDate: startDate,
          endDate: endDate,
          code: otherData.code,
          useableCount: otherData.useableCount,
          usedCount: otherData.usedCount,
        })
        .then(() => {
          closeDrawer();
          getDataList(paging.pageNumber, paging.perPage);
        })
        .catch((error) => {
          errorMessage(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      axios
        .post("/api/promocode/update", {
          id: otherData.id,
          name: otherData.name,
          description: otherData.description,
          startDate: otherData.startDate,
          endDate: otherData.endDate,
          useableCount: data.useableCount,
        })
        .then(() => {
          closeDrawer();
          getDataList(paging.pageNumber, paging.perPage);
        })
        .catch((error) => {
          errorMessage(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  function formHandler() {
    return (
      <PromocodeService
        loading={loading}
        edit={edit}
        submitHandler={submitHandler}
        disabledStartDate={disabledStartDate}
        getTitleList={getTitleList}
        titleLoading={titleLoading}
        titleList={titleList}
        episodeLoading={episodeLoading}
        episodeList={episodeList}
        getEpisodeList={getEpisodeList}
      />
    );
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "TitleName",
      dataIndex: ["Titles", "titleMm"],
      align: "center",
    },
    {
      title: "Episode Name",
      dataIndex: ["Episodes", "titleMm"],
      align: "center",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      align: "center",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      align: "center",
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <Row justify="end" gutter={12}>
          <Col>
            <Button
              type="primary"
              permission={"PROMOCODE_SERVICE_READ"}
              disabled={record["PromoCodeUsers@odata.count"] === 0}
              onClick={() => showDetail(record)}
              icon={<UserOutlined />}
            ></Button>
          </Col>
          <Col>
            <Tooltip>
              <Button
                type="primary"
                icon={<EditOutlined />}
                permissions={"PROMOCODE_SERVICE_UPDATE"}
                onClick={() => openDrawer(record)}
              ></Button>
            </Tooltip>
          </Col>
          <Col>
            <Popconfirm
              title="Delete User"
              description={`Are u sure delete this'${record.name}'?`}
              onConfirm={() => deleteUser(record.id)}
              okText="Delete"
              cancelText="Cancel"
            >
              <Button type="primary" danger icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </Col>
        </Row>
      ),
    },
  ];

  // console.log(promocodes)

  return (
    <Row
      gutter={[16, 16]}
      style={{ maxHeight: "calc(100vh - 96px)", overflowY: "auto" }}
    >
      <Col span={24}>
        <Row
          justify="space-between"
          align="center"
          gutter={24}
          style={{
            padding: "15px",
          }}
        >
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
              // disabled={!permissions.includes("PROMOCODE_PROMOCODE")}
            >
              Create New
            </Button>
          </Col>
        </Row>
        <Col span={24}>
          <Table
            loading={loading}
            dataSource={promocodes}
            columns={columns}
            rowKey={(record) => record.id}
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
            expandable={{
              rowExpandable: (record) => true,
              expandedRowRender: (record) => {
                return (
                  <Row gutter={24}>
                    <Col span={24}>
                      <Card>
                        <Row>
                          <Col span={4}>Description</Col>
                          <Col>
                            <Text span={20}>: {record.description}</Text>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card>
                        <Row>
                          <Col span={4}>Delete Note</Col>
                          <Col>
                            <Text span={20}>: {record.deleteNote}</Text>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card>
                        <Row gutter={24}>
                          <Col span={5}>
                            Delete At
                            <Text>: {record.deleteAt}</Text>
                          </Col>
                          <Col span={5}>
                            Code
                            <Text>: {record.code}</Text>
                          </Col>

                          <Col span={5}>
                            Usable Count
                            <Text>: {record.useableCount}</Text>
                          </Col>
                          <Col span={5}>
                            Used Count
                            <Text>: {record.usedCount}</Text>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                );
              },
            }}
          ></Table>
        </Col>
      </Col>
      F
      <Drawer
        title={edit ? "Edit User" : "Create New"}
        placement="right"
        width={700}
        open={showDrawer}
        onClose={() => closeDrawer()}
        destroyOnClose
      >
        {formHandler()}
      </Drawer>
      <Drawer
        name="PromoCode User"
        title="PromoCodeUser"
        placement="right"
        width={700}
        open={detailDrawer}
        onClose={() => closeDetail()}
        destroyOnClose
      >
        <PromocodeUser data={detail}></PromocodeUser>
      </Drawer>
    </Row>
  );
}
