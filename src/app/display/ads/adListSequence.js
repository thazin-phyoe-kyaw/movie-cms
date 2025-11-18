import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Form, Input, Row, Space, Table, Typography } from "antd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_DISPLAY_AD_LIST_CONST } from "@/lib/queryConst";
import { MenuOutlined } from "@ant-design/icons";

const { Text } = Typography;

const type = "ROW";
const DraggableBodyRow = ({ index, moveRow, ...restProps }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: type,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveRow(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <tr ref={ref} {...restProps} style={{ opacity: isDragging ? 0.5 : 1 }} />
  );
};
export default function AdListSequence({ closeSequence }) {
  const [sequenceData, setSequenceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState(sequenceData);
  useEffect(() => {
    getSequenceData(1, 100);
  }, []);

  async function getSequenceData(pageNumber, perPage) {
    setLoading(true);
    try {
      const result = await axios.get(
        `/api/ad_list/get_ad_list?${await apiQueryHandler(
          QUERY_DISPLAY_AD_LIST_CONST,
          {
            deletedAt: { value: "null", type: "isNull", label: "Is Delete" },
          },
          { sequence: "asc" },
          ["id", "status", "sequence", "adsLocation"],
          "no_child",
          { pageNumber, perPage }
        )}`
      );
      setSequenceData(result.data.value);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  function sequenceFinish(newIndex, oldIndex) {
    const dragRow = dataSource[newIndex];
    const newSeq = sequenceData.filter((_, index) => index !== oldIndex);
    setSequenceData([
      ...newSeq.slice(0, newIndex),
      sequenceData[oldIndex],
      ...newSeq.slice(newIndex, newSeq.length, dragRow),
    ]);
  }

  async function updateSequence() {
    setLoading(true);
    try {
      await axios.post("/api/ad_list/sequence", {
        sequence: sequenceData.map((data, index) => ({
          sequence: index + 1,
          id: data.id,
        })),
      });
      closeSequence(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const sequenceColumn = [
    {
      title: "",
      dataIndex: "icon",
      align: "center",
      render: () => <MenuOutlined />,
    },
    {
      title: "New Sequence",
      dataIndex: "sequence",
      align: "center",
      render: (text, record, index) => <Text>{index + 1}</Text>,
    },
    {
      title: "Old Sequence",
      dataIndex: "sequence",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "adsLocation",
      align: "center",
    },

    {
      title: "Order",
      dataIndex: "adsLocation",
      align: "end",
      render: (text, record, originalIndex) => (
        <Form
          onFinish={(values) =>
            sequenceFinish(values.number - 1, originalIndex)
          }
        >
          <Form.Item name="number">
            <Space.Compact style={{ width: "120px" }}>
              <Input type="number" />
              <Button type="primary" htmlType="submit">
                OK
              </Button>
            </Space.Compact>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        rowKey="key"
        columns={sequenceColumn}
        dataSource={sequenceData}
        loading={loading}
        pagination={false}
        components={{
          body: {
            row: DraggableBodyRow,
          },
        }}
        onRow={(record, index) => ({
          index,
          moveRow: sequenceFinish,
        })}
      />
      <Row justify="end" gutter={[16, 16]} style={{ marginTop: "12px" }}>
        <Col>
          <Button onClick={() => closeSequence()}>Cancel</Button>
        </Col>
        <Col>
          <Button type="primary" onClick={updateSequence} loading={loading}>
            Save
          </Button>
        </Col>
      </Row>
    </DndProvider>
  );
}
