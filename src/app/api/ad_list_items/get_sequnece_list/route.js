import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getQuery,
  paginationQuery,
  permissionHandler,
  queryFilterHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import {
  FILTER_CONST_ADS_ITEMS,
  FILTER_CONST_ADS_LIST,
} from "@/lib/queryConst";
import { GETADItems } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (permissionHandler(session, "DISPLAY_ADS_ITEMS_READ")) {
    return unauthorizeResponse();
  }
  const query = await getQuery(request.url);
  const filter = queryFilterHandler(query, FILTER_CONST_ADS_ITEMS);
  const pagination = paginationQuery(query);

  const adList = await GETADItems(
    `?$count=true&$select=id,sequence,name${
      filter !== "" ? `&$filter=${filter}` : ""
    }`
  );
  if (adList.error) {
    return errorResponse(adList.error);
  }
  return NextResponse.json(adList);
}
