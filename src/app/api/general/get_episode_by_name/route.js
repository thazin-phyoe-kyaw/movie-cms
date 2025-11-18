import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getQuery,
  paginationQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { EpisodeGet } from "@/modules/contentServiceModule/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (
    permissionHandler(
      session,
      "PROMOCODE_SERVICE_TITLE_ID_READ,PROMOCODE_SERVICE_EPISODE_ID_READ,DISPLAY_ADS_ITEMS_READ,PROFILE_SERVICE_FAVOURITE_READ,PROFILE_SERVICE_LIKE_READ,PROFILE_SERVICE_DOWNLOAD_READ,PROFILE_SERVICE_USER_SHARE_READ"
    )
  ) {
    return unauthorizeResponse();
  }
  const query = await getQuery(request.url);

  const pagination = paginationQuery(query);

  const getData = await EpisodeGet(
    `?$filter=type eq 'series'&$expand=series($select=seasons;$expand=seasons($select=nameMm;$expand=episodes($select=id,titleMm)))`
    // ${
    //     query.name && query.name !== ""
    //     ? `&$filter=startsWith(nameMm,'${query.name}')`
    //     : "&$orderby=createdAt desc"
    //  }&${pagination}`
  );

  if (getData.error) {
    return errorResponse(getData.error);
  }
  return NextResponse.json(getData);
}
