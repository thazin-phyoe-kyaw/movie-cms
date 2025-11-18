import { apiGetData } from "@/lib/apiQueryHandler";
import { authOptions } from "@/lib/auth";
import { EPIN_QUERY_GENERATION_JOB } from "@/lib/const";
import {
  errorResponse,
  getQuery,
  paginationQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { QUERY_EPIN_GENERATION_JOB_CONST } from "@/lib/queryConst";
import { EpinGenerateGet } from "@/modules/epinServiceModule/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "EPIN_EPIN_GENERATION_JOB_READ")) {
    return unauthorizeResponse();
  }
  const query = await getQuery(request.url);
  // const getEpinGenerateData = await EpinGenerateGet(
  //   `${EPIN_QUERY_GENERATION_JOB}&$orderBy=updatedAt desc &${pagination}`
  // );
  const getEpinGenerateData = await apiGetData(
    query,
    QUERY_EPIN_GENERATION_JOB_CONST,
    EpinGenerateGet
  );
  if (getEpinGenerateData.error) {
    return errorResponse(getEpinGenerateData.error);
  }
  return NextResponse.json(getEpinGenerateData);
}
