import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import HeaderComponent from "./headerBody";
import { CMSGetUserDetail } from "@/modules/cmsModule/controller";

export default async function LayoutHeader() {
  const { user } = await getServerSession(authOptions);
  const userDetail = await CMSGetUserDetail(user.id);

  return <HeaderComponent permissions={user.permissions} user={userDetail} />;
}
