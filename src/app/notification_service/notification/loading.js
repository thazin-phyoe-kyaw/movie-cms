"use client";

import { Skeleton } from "antd";

export default function Loading() {
  return <Skeleton loading={true} active></Skeleton>;
}