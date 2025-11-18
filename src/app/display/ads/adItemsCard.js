"use client";

import { Card, Col, Row, Tag } from "antd";

export default function AdsItemsCard({
  data
}) {
  return (
    <Row gutter={[16, 16]}>
      {data.map((item) => (
        <Col span={6}>
          <Card
            title={item.name}
            cover={
              <div style={{ position: "relative" }}>
                <div style={{ height: "150px" }}>
                  {item.bannerType === "htmlCode" ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.htmlCode
                          .replace("'<", "<")
                          .replace(
                            "/>'",
                            "style='height:150px;width:100%;object_fit:contain;opacity:0.6;' />"
                          ),
                      }}
                    />
                  ) : (
                    <img
                      style={{
                        height: "150px",
                        objectFit: "cover",
                        width: "100%",
                        opacity: "0.6",
                      }}
                      alt="image"
                      src={item.imageUrl}
                    />
                  )}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 6,
                    left: -10,
                    width: "100%",
                    height: "100%",
                  }}
                ></div>
              </div>
            }
          >
            <Row style={{ flexWrap: "nowrap" }}>
              <Col>
                <Tag type="primary">Click:{item.clickCount}</Tag>
              </Col>
              <Col>
                <Tag type="primary" style={{ margin: "0 5px" }}>
                  View:{item.viewCount}
                </Tag>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
