import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { QUERY_DISPLAY_ADS_ITEMS_CONST } from "@/lib/queryConst";
import { GETADItems } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getQuery } from "@/lib/globalFunctions";
import { apiGetData } from "@/lib/apiQueryHandler";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "DISPLAY_ADS_LIST_CREATE")) {
    return unauthorizeResponse();
  }

  // get query
  const query = await getQuery(request.url);

  const adItems = await apiGetData(
    query,
    QUERY_DISPLAY_ADS_ITEMS_CONST,
    GETADItems
  );

  if (adItems.error) {
    return errorResponse(adItems.error);
  }

  return NextResponse.json(adItems);
}
