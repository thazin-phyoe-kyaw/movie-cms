import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { QUERY_DISPLAY_AD_STREAMING_CONST } from "@/lib/queryConst";
import { GETStramingData } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getQuery } from "@/lib/globalFunctions";
import { apiGetData } from "@/lib/apiQueryHandler";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "DISPLAY_ADS_STREAMING_READ")) {
    return unauthorizeResponse();
  }

  const query = await getQuery(request.url);
  const streamingData = await apiGetData(
    query,
    QUERY_DISPLAY_AD_STREAMING_CONST,
    GETStramingData
  );

  if (streamingData.error) {
    return errorResponse(itemList.error);
  }

  return NextResponse.json(streamingData);
}
