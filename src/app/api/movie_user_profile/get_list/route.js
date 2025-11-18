import { apiGetData } from "@/lib/apiQueryHandler";
import { authOptions } from "@/lib/auth";
import { PROFILE_QUERY_PROFILE } from "@/lib/const";
import {
  errorResponse,
  getQuery,
  paginationQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { QUERY_PROFILE_CONST } from "@/lib/queryConst";
import { ProfileGet } from "@/modules/profileServiceModule/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "PROFILE_SERVICE_PROFILE_READ")) {
    return unauthorizeResponse();
  }

  // get query
  const query = await getQuery(request.url);

  const getDataProfile = await apiGetData(
    query,
    QUERY_PROFILE_CONST,
    ProfileGet
  );

  if (getDataProfile.error) {
    return errorResponse();
  }

  return NextResponse.json(getDataProfile);
}
