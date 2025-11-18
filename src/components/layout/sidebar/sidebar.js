"use client";
import { MENU_ITEMS } from "@/lib/menuConst";
import { Layout, Menu } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
//
export default function LayoutSidebar({ permissions }) {
  const [collapse, setCollapse] = useState(true);
  const [selected, setSelectd] = useState("1");
  const pathname = usePathname();

  useEffect(() => {
    setSelectd(selectionhandler());
  }, [pathname]);

  function menuHandler() {
    let accessMenu = [];

    // key: "1",
    // icon: <DashboardOutlined style={{ color: "#9f22a8" }} />,
    // label: <Link href="/">Dashboard</Link>,

    for (let i of MENU_ITEMS) {
      if (i.key === "1") {
        accessMenu = [...accessMenu, i];
      } else if (
        permissions.filter((value) => i.permission?.includes(value).length > 0)
      ) {
        let children = [];
        for (let c of i.children) {
          if (
            permissions.filter((value) => c.permission?.includes(value))
              .length > 0
          ) {
            children = [
              ...children,
              {
                key: c.key,
                label: c.label,
              },
            ];
          }
        }

        accessMenu = [
          ...accessMenu,
          {
            key: i.key,
            icon: i.icon,
            label: i.label,
            children,
          },
        ];
      }
    }

    return accessMenu;
  }

  function selectionhandler() {
    let links = [];

    for (let i of MENU_ITEMS) {
      if (i.key !== "1") {
        for (let { link, key } of i.children) {
          links = [...links, { link, key }];
        }
      }
    }

    const selected = links.filter((value) => value.link === pathname);

    if (selected.length > 0) {
      return selected[0].key;
    } else if (pathname.split("/")[1] == "subscription_service") {
      return "5.1";
    } else if (pathname.split("/")[2] == "epin_list") {
      return "8.1";
    } else {
      return "0";
    }
  }

  return (
    <Layout
      style={{ minHeight: "100vh", height: "100%", backgroundColor: "black" }}
    >
      <Layout.Sider
        collapsible
        selectedKeys={collapse}
        onCollapse={(value) => setCollapse(value)}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {collapse ? (
            <Image
              src="/images/square.png"
              height={48}
              width={48}
              style={{ margin: "8px" }}
              alt="square"
            />
          ) : (
            <Image
              src="/images/banner.png"
              height={48}
              width={144}
              style={{ margin: "8px" }}
              alt="banner"
            />
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selected}
          items={menuHandler()}
        />
      </Layout.Sider>
    </Layout>
  );
}
