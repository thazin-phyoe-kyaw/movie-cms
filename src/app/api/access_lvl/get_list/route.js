import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getQuery,
  paginationQuery,
  permissionHandler,
  queryFilterHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { FILTER_CONST_ACCESS_LEVEL } from "@/lib/queryConst";
import { AccessLvlList } from "@/modules/cmsModule/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function GET(request) {
  const session = await getServerSession(authOptions);

  // check access permission
  if (permissionHandler(session, "ACCESS_WATCH")) {
    return unauthorizeResponse();
  }

  // get daata
  const query = await getQuery(request.url);
  let url = `?$count=true`;
  const filter = queryFilterHandler(query, FILTER_CONST_ACCESS_LEVEL);
  const pagination = paginationQuery(query);

  const data = await AccessLvlList(
    `${url}${filter !== "" ? `&$filter=${filter}` : ""}&${pagination}`
  );

  if (data.error) {
    return errorResponse();
  }
  return NextResponse.json(data);
}
