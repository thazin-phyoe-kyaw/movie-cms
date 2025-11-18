import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getQuery } from "@/lib/globalFunctions";
import { movieTitle } from "@/modules/contentServiceModule/services";
import { apiGetData } from "@/lib/apiQueryHandler";
import { QUERY_SERIES_CONST } from "@/lib/queryConst";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CONTENT_SERIE_READ")) {
    return unauthorizeResponse();
  }
  const query = await getQuery(request.url);

  const series = await apiGetData(query, QUERY_SERIES_CONST, movieTitle);

  if (series.error) {
    return errorResponse(series.error);
  }

  return NextResponse.json(series);
}
