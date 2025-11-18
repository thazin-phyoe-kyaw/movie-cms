import { CONTENT_SERIES } from "@/lib/apiConst";
import { authOptions } from "@/lib/auth";
import { getEpisodes } from "@/modules/contentServiceModule/services";
import { getServerSession } from "next-auth";
import Seasonbody from "./body";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_CONTENT_EPISODE_CONST } from "@/lib/queryConst";
export default async function Series(props) {
  const searchParams = props.searchParams;
  const { seasonId } = searchParams;

  const { user } = await getServerSession(authOptions);
  const updatedFilter = {
    ...QUERY_CONTENT_EPISODE_CONST.filter,
    seasonId: {
      value: seasonId,
      type: "foreign",
      label: "Series",
      query: "",
    },
  };
  const episodes = await odataQueryHandler(
    QUERY_CONTENT_EPISODE_CONST,
    updatedFilter,
    QUERY_CONTENT_EPISODE_CONST.order,
    QUERY_CONTENT_EPISODE_CONST.fields,
    "no_child",
    {
      top: 10,
      skip: 0,
    },
    getEpisodes
  );
  return (
    <Seasonbody
      permissions={user.permissions}
      preData={
        episodes?.error
          ? { count: 0, value: [] }
          : {
              count: episodes["@odata.count"] ? episodes["@odata.count"] : 0,
              value: episodes?.value ? episodes?.value : [],
            }
      }
    ></Seasonbody>
  );
}
