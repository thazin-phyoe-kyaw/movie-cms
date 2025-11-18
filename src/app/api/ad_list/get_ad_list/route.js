import { apiGetData } from "@/lib/apiQueryHandler";
import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { QUERY_DISPLAY_AD_LIST_CONST } from "@/lib/queryConst";
import { GETADList } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (permissionHandler(session, "DISPLAY_ADS_ITEMS_READ")) {
    return unauthorizeResponse();
  }

  // get query
  const query = await getQuery(request.url);
  const adList = await apiGetData(
    query,
    QUERY_DISPLAY_AD_LIST_CONST,
    GETADList
  );

  if (adList.error) {
    return errorResponse(adList.error);
  }

  return NextResponse.json(adList);
}
