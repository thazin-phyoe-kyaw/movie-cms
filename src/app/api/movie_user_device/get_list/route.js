import { authOptions } from "@/lib/auth";
import { PROFILE_QUERY_USER_DEVICE } from "@/lib/const";
import {
  errorResponse,
  paginationQuery,
  permissionHandler,
  queryFilterHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { FILTER_CONST_PROFILE_USER_DEVICE } from "@/lib/queryConst";
import { GetUserDetail } from "@/modules/cmsModule/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "PROFILE_SERVICE_USER_DEVICE_READ")) {
    return unauthorizeResponse();
  }

  const query = await request.query();

  // filter here

  const filter = queryFilterHandler(query, FILTER_CONST_PROFILE_USER_DEVICE);
  const pagination = paginationQuery(query);

  // get data
  const getData = await GetUserDetail(
    `${PROFILE_QUERY_USER_DEVICE}${
      filter !== "" ? `&$filter=${filter}` : ""
    }&${pagination}`
  );

  if (getData.error) {
    return errorResponse(getData.error);
  }

  return NextResponse.json(getData);
}
