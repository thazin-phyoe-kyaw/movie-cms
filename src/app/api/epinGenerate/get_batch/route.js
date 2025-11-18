import { EPIN_EPIN_GENERATION_JOB } from "@/lib/apiConst";
import { authOptions } from "@/lib/auth";
import { EPIN_QUERY_GENERATION_JOB } from "@/lib/const";
import {
  errorResponse,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { EpinGenerateGet } from "@/modules/epinServiceModule/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (permissionHandler(session, "EPIN_EPIN_GENERATION_JOB_READ")) {
    return unauthorizeResponse();
  }

  //   const query = await getQuery(request.url);
  //   // console.log(query , 'this is route get')
  const getEpinBatch = await EpinGenerateGet(
    `$select=batchNo&$orderBy=updatedAt desc`
  );

  if (getEpinBatch.error) {
    return errorResponse(getEpinBatch.error);
  }
  return NextResponse.json(getEpinBatch);
}
