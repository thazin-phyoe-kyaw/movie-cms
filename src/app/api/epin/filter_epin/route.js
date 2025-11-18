import { apiGetData } from "@/lib/apiQueryHandler";
import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { QUERY_EPINS_CONST } from "@/lib/queryConst";
import { EpinGet } from "@/modules/epinServiceModule/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (permissionHandler(session, "EPIN_EPIN_READ")) {
    return unauthorizeResponse();
  }
  const query = await getQuery(request.url);

  console.log(query, "this is query");

  const getEpinData = await apiGetData(query, QUERY_EPINS_CONST, EpinGet);
  if (getEpinData.error) {
    return errorResponse(getEpinData.error);
  }
  return NextResponse.json(getEpinData);
}
