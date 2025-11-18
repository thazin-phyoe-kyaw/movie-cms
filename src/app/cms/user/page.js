import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserPage from "./body";
import { AccessLvlList, GetUserList } from "@/modules/cmsModule/services";
import { CMS_QUERY_USER_EXPAND_ACCESS_Lvl } from "@/lib/const";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_CMS_USER_CONST } from "@/lib/queryConst";
export default async function LayoutHeader() {
  const { user } = await getServerSession(authOptions);
  const cmsUsers = await GetUserList(
    `${CMS_QUERY_USER_EXPAND_ACCESS_Lvl}&$filter=isDelete eq false&$top=10&$skip=0`
  );

  const accessLvls = await AccessLvlList(
    "?$count=true&$filter=isPublished eq true&$top=100&$skip=0"
  );

  return (
    <UserPage
      user={user}
      permissions={user.permissions}
      cmsUsers={
        cmsUsers.error
          ? { count: 0, value: [] }
          : {
              count: cmsUsers["@odata.count"] ? cmsUsers["@odata.count"] : 0,
              value: cmsUsers.value ? cmsUsers.value : [],
            }
      }
      accessLvls={
        accessLvls.error
          ? { value: [] }
          : { value: accessLvls.value ? accessLvls.value : [] }
      }
    />
  );
}
