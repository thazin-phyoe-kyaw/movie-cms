import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  paginationQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { UserGet } from "@/modules/subscriptionModule/getUserNameModule/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (
    permissionHandler(
      session,
      "DISPLAY_ADS_ITEMS_READ,PROFILE_SERVICE_FAVOURITE_READ,PROFILE_SERVICE_LIKE_READ,PROFILE_SERVICE_DOWNLOAD_READ,PROFILE_SERVICE_USER_SHARE_READ"
    )
  ) {
    return unauthorizeResponse();
  }

  const query = await request.query();

  const pagination = paginationQuery(query);

  const getData = await UserGet(
    `&$count=true&$select=name,id${
      query.id && query.id !== ""
        ? `&$filter=id eq '${query.id}'`
        : "$&orderBy=createdAt desc"
    }&${pagination}`
  );

  if (getData.error) {
    return errorResponse(getData.error);
  }

  return NextResponse.json(getData);
}
