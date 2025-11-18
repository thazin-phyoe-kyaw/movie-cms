import { authOptions } from "@/lib/auth";
import { GetTitleById } from "@/lib/generalApis";
import {
  errorResponse,
  getQuery,
  paginationQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";

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
  const getData = await GetTitleById(
    `?$count=true&$select=id,type,nameMm${
      query.id !== "" ? `&$filter= id eq ${query.id}` : ""
    }&$expand=genreTitles($select=Title;$expand=Title($select=id,titleMm,type;$filter=movie/status eq true))`
  );

  if (getData.error) {
    return errorResponse(getData.error);
  }

  return NextResponse.json(getData);
}
