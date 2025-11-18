import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { QUERY_DISPLAY_AD_SLIDER_CONST } from "@/lib/queryConst";
import { GETSliderData } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getQuery } from "@/lib/globalFunctions";
import { apiGetData } from "@/lib/apiQueryHandler";
export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (permissionHandler(session, "DISPLAY_SLIDER_READ")) {
    return unauthorizeResponse();
  }
  // get query
  const query = await getQuery(request.url);
  const sliderData = await apiGetData(
    query,
    QUERY_DISPLAY_AD_SLIDER_CONST,
    GETSliderData
  );

  if (sliderData.error) {
    return errorResponse(sliderData.error);
  }

  return NextResponse.json(sliderData);
}
