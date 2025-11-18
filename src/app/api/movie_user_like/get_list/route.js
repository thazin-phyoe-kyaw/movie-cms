import { authOptions } from "@/lib/auth";
import { PROFILE_QUERY_LIKE } from "@/lib/const";
import {
  errorResponse,
  paginationQuery,
  permissionHandler,
  queryFilterHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import {
  FILTER_CONST_PROFILE_LIKE,
} from "@/lib/queryConst";
import {
  ProfileLikeGet,
} from "@/modules/profileServiceModule/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "PROFILE_SERVICE_LIKE_READ")) {
    return unauthorizeResponse();
  }

  // get query
  const query = await request.query();

  // get pagination

  const filter = queryFilterHandler(query, FILTER_CONST_PROFILE_LIKE);
  const pagination = paginationQuery(query);

  // get data
  const getData = await ProfileLikeGet(
    `${PROFILE_QUERY_LIKE}${
      filter !== "" ? `&$filter=${filter}` : ""
    }&${pagination}`
  );

  if (getData.error) {
    return errorResponse(getData.error);
  }

  return NextResponse.json(getData);
}
