import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getQuery } from "@/lib/globalFunctions";
import { getEpisodes } from "@/modules/contentServiceModule/services";
import { QUERY_CONTENT_EPISODE_CONST } from "@/lib/queryConst";
import { apiGetData } from "@/lib/apiQueryHandler";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CONTENT_SERIE_READ")) {
    return unauthorizeResponse();
  }
  const query = await getQuery(request.url);
  const { seasonId } = query;
  const MODIFIED_CONTENT_EPISODE_CONST = {
    ...QUERY_CONTENT_EPISODE_CONST,
    seasonId: {
      value: seasonId,
      type: "foreign",
      label: "Series",
      query: "",
    },
  };

  const episodes = await apiGetData(
    query,
    MODIFIED_CONTENT_EPISODE_CONST,
    getEpisodes
  );

  if (episodes.error) {
    return errorResponse(episodes.error);
  }

  return NextResponse.json(episodes);
}
