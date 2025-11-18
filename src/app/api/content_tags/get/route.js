import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getQuery } from "@/lib/globalFunctions";
import { getTag } from "@/modules/contentServiceModule/services";
import { apiGetData } from "@/lib/apiQueryHandler";
import { QUERY_CONTENT_TAG_CONST } from "@/lib/queryConst";
export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CONTENT_TAG_READ")) {
    return unauthorizeResponse();
  }

  const query = await getQuery(request.url);
  const tags = await apiGetData(query, QUERY_CONTENT_TAG_CONST, getTag);

  if (tags.error) {
    return errorResponse(tags.error);
  }

  return NextResponse.json(tags);
}
