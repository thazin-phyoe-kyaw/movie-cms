import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import AccessLevlesBody from "./body";
import { AccessLvlList } from "@/modules/cmsModule/services";
export default async function AccessRolePage() {
  const { user } = await getServerSession(authOptions);
  let url = `?$count=true&$filter=isPublished eq true`;
  const data = await AccessLvlList(url);
  return (
    <AccessLevlesBody
      permissions={user.permissions}
      accessData={data ? data : []}
    />
  );
}
