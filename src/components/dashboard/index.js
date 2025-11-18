"use client";
import React, { useState } from "react";
import { Card, Col, Flex, Row, Space, Statistic, Typography } from "antd";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import ChartJS from "chart.js/auto";
import {
  FundOutlined,
  NotificationOutlined,
  PlaySquareOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const accessLevels = {
  0: { label: "CMS Access Role Admin", value: 5 },
  1: { label: "CMS AccessLvl Manager (developer)", value: 7 },
  2: { label: "CMS user Watcher", value: 19 },
  3: { label: "CMS User Editor", value: 10 },
  4: { label: "CMS User Admin", value: 11 },
};

export default function Dashboardpage({ permissions, dataObject }) {
  const lineChartData = {
    labels: ["Genre", "Tag", "Movie", "Series"],
    datasets: [
      {
        label: "Count",
        barPercentage: 1,
        barThickness: 45,
        data: [
          dataObject.genreCount,
          dataObject.tagCount,
          dataObject.movieCount,
          dataObject.seriesCount,
        ],
        backgroundColor: ["#ADFA1B"],
        borderColor: ["#ADFA1B"],
        borderRadius: 6,
        color: "#FAFAFA",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "none",
      },
      title: {
        display: true,
        text: "All of the Data Chart",
        align: "start",
        color: "#FAFAFAFA",
        font: {
          size: 20,
        },
        padding: {
          bottom: 40,
        },
      },
    },
  };

  const prodata = {
    labels: ["Genere", "Tag", "Movie", "Series"],
    datasets: [
      {
        label: "count",
        data: [
          dataObject.genreCount,
          dataObject.tagCount,
          dataObject.movieCount,
          dataObject.seriesCount,
        ],
        backgroundColor: ["#7091F5", "#97FFF4", "#CEDEBD", "#5C8374"],
        borderColor: ["#CAEDFF", "#D8B4FB"],
        borderWidth: 1,
      },
    ],
  };

  const iconStyle = {
    fontSize: "20px",
    color: "#FAFAFA",
  };

  const typoStyle = {
    fontWeight: "lighter",
    fontSize: "15px",
    color: "#FAFAFA",
  };

  const headStyle = {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#FAFAFA",
  };

  const [displayData, setDisplayData] = useState({});

  return (
    <div>
      <Typography
        style={{
          fontSize: "30px",
          color: "#FAFAFA",
        }}
      >
        DASHBOARD
      </Typography>

      {/* card collection */}

      <Row
        justify="space-between"
        style={{
          padding: "30px 0",
        }}
      >
        <Col style={{ width: "280px" }}>
          <Card
            bodyStyle={{ padding: "10px 24px" }}
            style={{ backgroundColor: "" }}
          >
            <Flex justify="space-between">
              <Typography style={typoStyle}>Total User</Typography>
              <TeamOutlined style={iconStyle} />
            </Flex>

            <Text style={headStyle}>{dataObject.totalUser}</Text>
          </Card>
        </Col>
        <Col style={{ width: "280px" }}>
          <Card
            bodyStyle={{ padding: "10px 24px" }}
            style={{ backgroundColor: "" }}
          >
            <Flex justify="space-between">
              <Typography style={typoStyle}>Total AdList</Typography>
              <NotificationOutlined style={iconStyle} />
            </Flex>

            <Text style={headStyle}>{dataObject.totalAdListCount}</Text>
          </Card>
        </Col>
        <Col style={{ width: "280px" }}>
          <Card
            bodyStyle={{ padding: "10px 24px" }}
            style={{ backgroundColor: "" }}
          >
            <Flex justify="space-between">
              <Typography style={typoStyle}>Total AdClick</Typography>
              <FundOutlined style={iconStyle} />
            </Flex>

            <Text style={headStyle}>{dataObject.totalAdsClickCount}</Text>
          </Card>
        </Col>
        <Col style={{ width: "280px" }}>
          <Card
            bodyStyle={{ padding: "10px 24px" }}
            style={{ backgroundColor: "" }}
          >
            <Flex justify="space-between">
              <Typography style={typoStyle}>Total Streaming Ad</Typography>
              <PlaySquareOutlined style={iconStyle} />
            </Flex>

            <Text style={headStyle}>{dataObject.totalStreamingCount}</Text>
          </Card>
        </Col>
      </Row>

      <Flex justify="space-between">
        <Card style={{ backgroundColor: "" }}>
          <Bar
            data={lineChartData}
            height={400}
            options={options}
            width={530}
          />
        </Card>
        <Card style={{ backgroundColor: "" }}>
          <Bar
            data={lineChartData}
            height={400}
            options={options}
            width={530}
          />
        </Card>
      </Flex>
    </div>
  );
}
