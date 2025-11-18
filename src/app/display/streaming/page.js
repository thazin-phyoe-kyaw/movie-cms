import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import StreamingBody from "./body";
import { GETStramingData } from "@/modules/displayServiceModule/service";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_DISPLAY_AD_STREAMING_CONST } from "@/lib/queryConst";
export default async function ADList() {
  const { user } = await getServerSession(authOptions);
  const streamingData = await odataQueryHandler(
    QUERY_DISPLAY_AD_STREAMING_CONST,
    QUERY_DISPLAY_AD_STREAMING_CONST.filter,
    QUERY_DISPLAY_AD_STREAMING_CONST.order,
    QUERY_DISPLAY_AD_STREAMING_CONST.fields,
    "no_child",
    {
      top: 10,
      skip: 0,
    },
    GETStramingData
  );

  return (
    <StreamingBody
      permissions={user.permissions}
      preData={
        streamingData.error
          ? { count: 0, value: [] }
          : {
              count: streamingData["@odata.count"]
                ? streamingData["@odata.count"]
                : 0,
              value: streamingData.value ? streamingData.value : [],
            }
      }
    ></StreamingBody>
  );
}
