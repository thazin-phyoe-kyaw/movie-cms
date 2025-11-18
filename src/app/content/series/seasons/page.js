import { authOptions } from "@/lib/auth";
import { getSeasons } from "@/modules/contentServiceModule/services";
import { getServerSession } from "next-auth";
import Seasonbody from "./body";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_CONTENT_SEASON_CONST } from "@/lib/queryConst";
export default async function Series(props) {
  const searchParams = props.searchParams;
  const { seriesId } = searchParams;
  const { user } = await getServerSession(authOptions);
  const updatedFilter = {
    ...QUERY_CONTENT_SEASON_CONST.filter,
    seriesId: {
      value: seriesId,
      type: "foreign",
      label: "Series",
      query: "",
    },
  };
  const seasons = await odataQueryHandler(
    QUERY_CONTENT_SEASON_CONST,
    updatedFilter,
    QUERY_CONTENT_SEASON_CONST.order,
    QUERY_CONTENT_SEASON_CONST.fields,
    "no_child",
    { top: 10, skip: 0 },
    getSeasons
  );

  return (
    <Seasonbody
      permissions={user.permissions}
      preData={
        seasons?.error
          ? { count: 0, value: [] }
          : {
              count: seasons["@odata.count"] ? seasons["@odata.count"] : 0,
              value: seasons?.value ? seasons?.value : [],
            }
      }
    ></Seasonbody>
  );
}
