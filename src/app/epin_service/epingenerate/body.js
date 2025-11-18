"use client";
import EpinActivateForm from "@/components/EpinGenerationJob/EpinActivateForm";
import EpinGenJob from "@/components/EpinGenerationJob/EpinGenJob";
//import EpinGenJob from "@/components/EpinGenerationJob/EpinGenJob";
import { nextQueryHandler } from "@/lib/globalFunctions";
import { errorMessage } from "@/lib/uiFunctions";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  Spin,
  Table,
  Typography,
  message,
} from "antd";
import axios from "axios";
import { debounce } from "lodash";
import React, { useState } from "react";
const { Text } = Typography;

import { useRouter } from "next/navigation";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_EPIN_GENERATION_JOB_CONST } from "@/lib/queryConst";
import SearchHandler from "@/lib/searchHandler";

export default function EpinGenerate({ permissions, epinGenerData }) {
  const [loading, setLoading] = useState(false);
  const [planLoading, setPlanLoading] = useState(false);
  const [planIdList, setplanIdList] = useState([]);
  const [epinGenerateData, setEpinGenerateData] = useState(epinGenerData.value);
  const [order, setOrder] = useState(QUERY_EPIN_GENERATION_JOB_CONST.order);

  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 10,
    total: epinGenerData.total,
  });
  const [filter, setFilter] = useState(QUERY_EPIN_GENERATION_JOB_CONST.filter);
  const [detailDrawer, setDetailDrawer] = useState(false);

  const [showDrawer, setShowDrawer] = useState(false);
  const [editEpin, setEditEpin] = useState(false);
  const [filteredEpins, setFilteredEpins] = useState([]);
  const [filteredEpinUser, setFilteredEpinUser] = useState([]);

  const [detail, setDetail] = useState(false);
  const [actiEpin, setActiEpin] = useState({});
  const [showActivateDrawer, setShowActivateDrawer] = useState(false);
  const router = useRouter();

  function showDetail(data) {
    setDetail(data);
    setDetailDrawer(true);
  }
  function closeDetail() {
    setDetailDrawer(false);
    setDetail(false);
    setFilteredEpins("");
  }

  function openDrawer(editdata) {
    if (editdata) {
      setEditEpin(editdata);
      setShowDrawer(true);
    } else {
      setShowDrawer(true);
    }
  }
  function closeDrawer() {
    setShowDrawer(false);

    setEditEpin(false);
  }

  function openActivateDrawer(actidata) {
    if (actidata) {
      setActiEpin(actidata);
      setShowActivateDrawer(true);
    } else {
      setShowActivateDrawer(true);
    }
  }
  function closeActivateDrawer() {
    setShowActivateDrawer(false);
    setActiEpin(false);
  }

  function activateEpin(data) {
    setLoading(true);
    axios
      .post("/api/epinGenerate/activate", {
        batchNo: data.batchNo,
        status: data.status,
        price: data.price,
        expiredDuration: data.expiredDuration,
      })
      .then(() => {
        getEpinGenerateList(paging.pageNumber, paging.perPage, filter);
        closeActivateDrawer();
      })
      .catch((error) => {
        errorMessage(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function getEpinGenerateList(pageNumber, perPage, newFilter = filter) {
    setLoading(true);
    let query = await apiQueryHandler(
      QUERY_EPIN_GENERATION_JOB_CONST,
      newFilter,
      order,
      QUERY_EPIN_GENERATION_JOB_CONST.fields,
      "normal",
      { pageNumber, perPage }
    );
    axios
      .get(`/api/epinGenerate/get_list?${query}`)
      .then(({ data: result }) => {
        if (result.value.length < 1) {
          message.warning("No found");
        }
        setPaging({
          pageNumber,
          perPage,
          total: result["@odata.count"],
        });
        setEpinGenerateData(result.value);
      })
      .catch((error) => {
        errorMessage(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  //delete epingeneratejob
  function deleteEpin(id) {
    setLoading(true);
    axios
      .post("/api/epinGenerate/delete", { id })
      .then(() => {
        getEpinGenerateList(paging.pageNumber, paging.perPage, filter);
      })
      .catch((err) => errorMessage(err));
  }

  //create epin
  function submitEpinGenerateHandler(data) {
    if (editEpin) {
      setLoading(true);
      axios
        .post("/api/epinGenerate/update", {
          id: data.id,
          description: data.description,
        })
        .then(() => {
          closeDrawer();
          getEpinGenerateList(pageNumber, perPage, filter);
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
        .post("/api/epinGenerate/create", data)
        .then((res) => {
          closeDrawer();
          getEpinGenerateList(paging.pageNumber, paging.perPage, filter);
        })
        .catch((error) => {
          errorMessage(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  // get mahar epin package
  function getPlanList(name) {
    setPlanLoading(true);
    axios
      .get(
        `/api/epinGenerate/get_epin_pid?name=${name}&pageNumber=1&perPage=15`
      )
      .then(({ data }) => {
        setplanIdList(data.value);
      })
      .catch((err) => {
        errorMessage(err);
      })
      .finally(() => setPlanLoading(false));
  }

  // for generate epin
  function EpinGenerateHandler() {
    return (
      <EpinGenJob
        loading={loading}
        editEpin={editEpin}
        submitEpinGenerateHandler={submitEpinGenerateHandler}
        getPlanList={getPlanList}
        debounce={debounce}
        planIdList={planIdList}
        planLoading={planLoading}
      />
    );
  }

  function EpinActivateHandler() {
    return (
      <EpinActivateForm
        loading={loading}
        actiEpin={actiEpin}
        activateEpin={activateEpin}
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
      title: "Batch No",
      dataIndex: "batchNo",
      align: "center",
    },
    {
      title: "Expire Date",
      dataIndex: "expireDate",
      align: "center",
      render: (expiredDate) => {
        const date = new Date(expiredDate);
        const formattedDate = `${("0" + date.getDate()).slice(-2)}-${(
          "0" +
          (date.getMonth() + 1)
        ).slice(-2)}-${date.getFullYear()} ${("0" + date.getHours()).slice(
          -2
        )}:${("0" + date.getMinutes()).slice(-2)}:${(
          "0" + date.getSeconds()
        ).slice(-2)}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Prefix",
      dataIndex: "prefix",
      align: "center",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      align: "center",
    },
    {
      title: "Lot",
      dataIndex: "lot",
      align: "center",
    },
    {
      title: "Count",
      dataIndex: "count",
      align: "center",
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <Row justify="end" gutter={8}>
          <Col>
            <Button
              type="primary"
              disabled={!permissions.includes("EPIN_EPIN_READ")}
              onClick={() => openActivateDrawer(record)}
            >
              Activate
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => openDrawer(record)}
            />
          </Col>
          <Col>
            <Popconfirm
              title="Delete User"
              description="Are you sure delete this!"
              onConfirm={() => deleteEpin(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Col>
          <Col>
            <Button
              onClick={() =>
                router.push(`/epin_service/epin_list/${record.id}`)
              }
            >
              List
            </Button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Row
      gutter={[16, 16]}
      style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}
    >
      <Col span={24}>
        <Row justify="space-between" gutter={[16, 16]}>
          <Col span={15}>
            <SearchHandler
              filter={filter}
              setFilter={setFilter}
              order={order}
              setOrder={setOrder}
              pagination={paging}
              apiHandler={getEpinGenerateList}
            />
          </Col>

          <Col>
            <Button
              type="primary"
              disabled={!permissions.includes("EPIN_EPIN_READ")}
              onClick={() => openDrawer()}
            >
              Create New
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Table
          loading={loading}
          dataSource={epinGenerateData}
          columns={columns}
          rowKey={(record) => record.id}
          pagination={{
            total: paging.total,
            defaultCurrent: 1,
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50],
            onChange: (pageNumber, perPage) => {
              getEpinGenerateList(pageNumber, perPage, filter);
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
                        <Col span={8}>CSV Name</Col>
                        <Col>
                          <Text span={16}>: {record.csvName}</Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>csv Delete Status</Col>
                        <Col>
                          <Text span={16}>
                            : {record.csvDeleteStatus ? "true" : "false"}
                          </Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>Creator</Col>
                        <Col>
                          <Text span={16}>: {record.creator}</Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>Description</Col>
                        <Col>
                          <Text span={16}>: {record.description}</Text>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              );
            },
          }}
        />
      </Col>

      {/* <Col>
        <Button
          type="primary"
          permission={"EPIN_EPIN_READ"}
          onClick={() => showDetail()}
        >
          Epin Search
        </Button>
      </Col> */}
      <Drawer
        //name="Epin Activate"
        title="Epin Activate"
        placement="right"
        width={700}
        open={showActivateDrawer}
        onClose={() => closeActivateDrawer()}
        destroyOnClose
      >
        {EpinActivateHandler()}
      </Drawer>
      <Drawer
        title={editEpin ? "Edit User" : "Create New"}
        placement="right"
        width={1000}
        open={showDrawer}
        onClose={() => closeDrawer()}
        destroyOnClose
      >
        {EpinGenerateHandler()}
      </Drawer>
    </Row>
  );
}

// async function submitSearch({ serialNo }) {
//   setLoading(true);
//   axios
//     .get(`/api/epin/get_list?serialNo=${serialNo}`)
//     .then(({ data }) => {
//       if (data.length < 1 && profileData.value.length < 1) {
//         message.warning("No results found");
//       }

//       setFilteredEpins(data.epinData);
//       setFilteredEpinUser(data.profileData);
//     })
//     .catch((error) => {
//       errorMessage(error);
//     })
//     .finally(() => {
//       setLoading(false);
//     });
// }

//  <Drawer
//         name="Epin"
//         title="Epin"
//         placement="right"
//         width={700}
//         open={detailDrawer}
//         onClose={() => closeDetail()}
//         destroyOnClose
//       >
//         <Form onFinish={(e) => submitSearch(e)}>
//           <Form.Item name="serialNo">
//             <Input />
//           </Form.Item>
//           <Form.Item>
//             <Button
//               type="primary"
//               loading={loading}
//               disabled={loading}
//               htmlType="submit"
//             >
//               Search
//             </Button>
//           </Form.Item>
//         </Form>

//         {detailDrawer && filteredEpins && filteredEpins.length > 0 ? (
//           <Card>
//             <div>
//               <p>SerialNo: {filteredEpins[0]?.serialNo}</p>
//               <p>Epin No: {filteredEpins[0]?.epinNo}</p>
//               <p>ExpiredDate: {filteredEpins[0]?.expiredDate}</p>
//               <p>Duration: {filteredEpins[0]?.duration}</p>
//               <p>Price: {filteredEpins[0]?.price || 0}</p>
//               <p>planId: {filteredEpins[0]?.planId || 0}</p>
//               <p>Status: {filteredEpins[0]?.status}</p>
//               <p>createdAt: {filteredEpins[0]?.createdAt}</p>
//               <p>updatedAt: {filteredEpins[0]?.updatedAt}</p>
//               <p>
//                 createdBy:{" "}
//                 {filteredEpins[0]?.createdBy !== undefined &&
//                 filteredEpins[0]?.createdBy !== null
//                   ? filteredEpins[0]?.createdBy
//                   : "null"}
//               </p>
//               <p>
//                 updatedBy:{" "}
//                 {filteredEpins[0]?.updatedBy !== undefined &&
//                 filteredEpins[0]?.updatedBy !== null
//                   ? filteredEpins[0]?.updatedBy
//                   : "null"}
//               </p>
//             </div>
//             {filteredEpinUser && (
//               <div>
//                 <h3>User Data:</h3>
//                 <p>Firebase User ID: {filteredEpinUser.firebaseUserId}</p>
//                 <p>Type: {filteredEpinUser.type}</p>
//                 <p>Email: {filteredEpinUser.email}</p>
//                 <p>Phone Number: {filteredEpinUser.phoneNumber}</p>
//                 <p>Name: {filteredEpinUser.name}</p>
//                 <p>Number: {filteredEpinUser.number}</p>
//                 <p>Date of Birth: {filteredEpinUser.dateOfBirth}</p>
//                 <p>Gender: {filteredEpinUser.gender}</p>
//                 <p>Status: {filteredEpinUser.status}</p>
//                 <p>Last Login: {filteredEpinUser.lastLogin}</p>
//               </div>
//             )}
//           </Card>
//         ) : null}
//</Drawer>
