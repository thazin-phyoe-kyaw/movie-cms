import { apiGetData } from "@/lib/apiQueryHandler";
import { authOptions } from "@/lib/auth";
import { CMS_QUERY_USER_EXPAND_ACCESS_Lvl } from "@/lib/const";
import {
  errorResponse,
  getQuery,
  paginationQuery,
  permissionHandler,
  queryFilterHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { FILTER_CONST_CMS_USER, QUERY_CMS_USER_CONST } from "@/lib/queryConst";
import { GetUserList } from "@/modules/cmsModule/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CMS_USER_WATCH,DISPLAY_ADMIN_USER_WATCH")) {
    return unauthorizeResponse();
  }
  // get query
  const query = await getQuery(request.url);
  // select columns

  // const filter = queryFilterHandler(query, FILTER_CONST_CMS_USER);
  // const pagination = paginationQuery(query);
  // // get data
  // const users = await GetUserList(
  //   `${CMS_QUERY_USER_EXPAND_ACCESS_Lvl}${
  //     filter !== "" ? `&$filter=${filter}` : ""
  //   }&${pagination}`
  // );

  const users = await apiGetData(query, QUERY_CMS_USER_CONST, GetUserList);
  if (users.error) {
    return errorResponse();
  }
  return NextResponse.json(users);
}
