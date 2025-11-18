import { PromocodeGet } from "@/modules/promocodeModule/services";
import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { QUERY_PROMOCODE_CONST } from "@/lib/queryConst";
import { PromodeUserHandler } from "@/lib/dataHandler";
import { apiGetData } from "@/lib/apiQueryHandler";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (permissionHandler(session, "PROMOCODE_SERVICE_READ")) {
    return unauthorizeResponse();
  }

  const query = await getQuery(request.url);
  const getData = await apiGetData(query, QUERY_PROMOCODE_CONST, PromocodeGet);
  if (getData.error) {
    return errorResponse();
  }

  return NextResponse.json(getData);
}
