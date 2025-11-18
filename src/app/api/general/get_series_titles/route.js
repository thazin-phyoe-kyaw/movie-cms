import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getQuery,
  paginationQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { SeriesTitleGet } from "@/modules/contentServiceModule/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (
    permissionHandler(
      session,
      "PROMOCODE_SERVICE_TITLE_ID_READ,DISPLAY_ADS_ITEMS_READ,PROFILE_SERVICE_FAVOURITE_READ,PROFILE_SERVICE_LIKE_READ,PROFILE_SERVICE_DOWNLOAD_READ,PROFILE_SERVICE_USER_SHARE_READ"
    )
  ) {
    return unauthorizeResponse();
  }
  const query = await getQuery(request.url);
  const pagination = paginationQuery(query);

  const getData = await SeriesTitleGet(
    `?$count=true&$select=id,titleMm,titleEn,type,isPremium,resolution,rating,sorting&$expand=series($select=id)${
      query.name && query.name !== ""
        ? `&$filter=startsWith(titleMm,'${query.name}') and Series ne null`
        : "&$orderby=createdAt desc"
    }&${pagination}`
  );

  if (getData.error) {
    return errorResponse(getData.error);
  }

  return NextResponse.json(getData);
}
