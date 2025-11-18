import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import ADListBody from "./body";
import { GETADList } from "@/modules/displayServiceModule/service";
import { QUERY_DISPLAY_AD_LIST_CONST } from "@/lib/queryConst";
import { odataQueryHandler } from "@/lib/apiQueryHandler";

export default async function ADList() {
  const {
    user: { permissions },
  } = await getServerSession(authOptions);

  const adList = await odataQueryHandler(
    QUERY_DISPLAY_AD_LIST_CONST,
    QUERY_DISPLAY_AD_LIST_CONST.filter,
    QUERY_DISPLAY_AD_LIST_CONST.order,
    QUERY_DISPLAY_AD_LIST_CONST.fields,
    "normal",
    { top: 10, skip: 0 },
    GETADList
  );

  return (
    <ADListBody
      permissions={permissions}
      preData={
        adList.error
          ? { count: 0, value: [] }
          : {
              count: adList["@odata.count"] ? adList["@odata.count"] : 0,
              value: adList.value ? adList.value : [],
            }
      }
    />
  );
}
