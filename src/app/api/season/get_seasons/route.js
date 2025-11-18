import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getQuery } from "@/lib/globalFunctions";
import { getSeasons } from "@/modules/contentServiceModule/services";
import { apiGetData } from "@/lib/apiQueryHandler";
import { QUERY_CONTENT_SEASON_CONST } from "@/lib/queryConst";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (permissionHandler(session, "CONTENT_SERIE_READ")) {
    return unauthorizeResponse();
  }
  const query = await getQuery(request.url);

  const { seriesId } = query;

  const MODIFIED_CONTENT_SEASON_CONST = {
    ...QUERY_CONTENT_SEASON_CONST,
    seriesId: {
      value: seriesId,
      type: "foreign",
      label: "Series",
      query: "",
    },
  };
  const seasons = await apiGetData(
    query,
    MODIFIED_CONTENT_SEASON_CONST,
    getSeasons
  );

  if (seasons.error) {
    return errorResponse(seasons.error);
  }

  return NextResponse.json(seasons);
}
