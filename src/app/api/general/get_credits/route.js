import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getQuery,
  paginationQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { getCredits, getGenre } from "@/modules/contentServiceModule/services";
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
  const getData = await getCredits(
    `?$count=true&$select=id,keywords,nameMm,nameEn${
      query.name && query.name !== ""
        ? `&$filter=(startswith(nameMm,'${query.name}') or startswith(nameEn,'${query.name}') or startswith(keywords,'${query.name}'))`
        : "&$orderby=createdAt desc"
    }&${pagination}`
  );

  if (getData.error) {
    return errorResponse(getData.error);
  }

  return NextResponse.json(getData);
}
