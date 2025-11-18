import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import LayoutSidebar from "./sidebar";
import { signOut } from "next-auth/react";

export default async function Sidebar() {
  const { user } = await getServerSession(authOptions);

  if (!user || !user.permissions) {
    signOut();
  }

  return <LayoutSidebar permissions={user?.permissions} />;
}
