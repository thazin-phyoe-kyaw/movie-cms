import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getQuery } from "@/lib/globalFunctions";

import { getCredits } from "@/modules/contentServiceModule/services";
import { apiGetData } from "@/lib/apiQueryHandler";
import { QUERY_CONTENT_CREDIT_CONST } from "@/lib/queryConst";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (permissionHandler(session, "CONTENT_GENRE_READ")) {
    return unauthorizeResponse();
  }

  const query = await getQuery(request.url);
  const credits = await apiGetData(
    query,
    QUERY_CONTENT_CREDIT_CONST,
    getCredits
  );

  if (credits.error) {
    return errorResponse(credits.error);
  }

  return NextResponse.json(credits);
}
