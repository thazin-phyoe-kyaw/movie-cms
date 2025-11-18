import { apiGetData } from "@/lib/apiQueryHandler";
import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { QUERY_EPIN_PACKAGE_CONST } from "@/lib/queryConst";
import { EpinPackageGet } from "@/modules/epinServiceModule/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "EPIN_PACKAGES_READ")) {
    return unauthorizeResponse();
  }
  const query = await getQuery(request.url);
  const getEpinPackageData = await apiGetData(
    query,
    QUERY_EPIN_PACKAGE_CONST,
    EpinPackageGet
  );

  if (getEpinPackageData.error) {
    return errorResponse(getEpinPackageData.error);
  }
  return NextResponse.json(getEpinPackageData);
}
