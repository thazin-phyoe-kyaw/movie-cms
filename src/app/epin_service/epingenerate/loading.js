"use client";

import { Skeleton } from "antd";

export default function loading() {
  return <Skeleton loading={true} active></Skeleton>;
}
