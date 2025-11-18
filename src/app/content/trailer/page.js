import { authOptions } from "@/lib/auth";
import { getTrailers } from "@/modules/contentServiceModule/services";
import { getServerSession } from "next-auth";

import TrailerBody from "./body";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_CONTENT_TRAILER_CONST } from "@/lib/queryConst";

export default async function Role() {
  const { user } = await getServerSession(authOptions);
  const trailers = await odataQueryHandler(
    QUERY_CONTENT_TRAILER_CONST,
    QUERY_CONTENT_TRAILER_CONST.filter,
    QUERY_CONTENT_TRAILER_CONST.order,
    QUERY_CONTENT_TRAILER_CONST.fields,
    "no_child",
    {
      top: 10,
      skip: 0,
    },
    getTrailers
  );

  return (
    <TrailerBody
      permissions={user.permissions}
      preData={
        trailers.error
          ? { count: 0, value: [] }
          : {
              count: trailers["@odata.count"] ? trailers["@odata.count"] : 0,
              value: trailers.value ? trailers.value : [],
            }
      }
    ></TrailerBody>
  );
}
