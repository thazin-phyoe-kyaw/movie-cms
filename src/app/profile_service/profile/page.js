import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import ProfileService from "./body";
import { ProfileGet } from "@/modules/profileServiceModule/services";
import { PROFILE_QUERY_PROFILE } from "@/lib/const";
import { ProfileUserHandler } from "@/lib/dataHandler";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_PROFILE_CONST } from "@/lib/queryConst";

export default async function LayoutHeader() {
  const { user } = await getServerSession(authOptions);
  // const rawProfile = await ProfileGet(
  //   `${PROFILE_QUERY_PROFILE}&$top=10&$skip=0`
  // );
  const rawProfile = await odataQueryHandler(
    QUERY_PROFILE_CONST,
    QUERY_PROFILE_CONST.filter,
    QUERY_PROFILE_CONST.order,
    QUERY_PROFILE_CONST.fields,
    "normal",
    {
      top: 10,
      skip: 0,
    },
    ProfileGet
  );

  if(rawProfile.error) return <div style={{color : "red"}}>{rawProfile.error}</div>

  const data = await ProfileUserHandler(rawProfile);

  return (
    <ProfileService
      permissions={user.permissions}
      data={{
        total: data["@odata.count"] ? data["@odata.count"] : 0,
        value: data.value ? data.value : [],
      }}
    />
  );
}
