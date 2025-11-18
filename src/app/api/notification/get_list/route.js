import { apiGetData } from "@/lib/apiQueryHandler";
import { authOptions } from "@/lib/auth";
import { NOTIFICATION_QUERY_NOTI } from "@/lib/const";
import {
  errorResponse,
  getQuery,
  paginationQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { QUERY_NOTIFICATION_CONST } from "@/lib/queryConst";
import { NotificationGet } from "@/modules/NotificationServiceModule/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "NOTIFICATION_READ")) {
    return unauthorizeResponse();
  }
  const query = await getQuery(request.url);

  const getNotification = await apiGetData(
    query,
    QUERY_NOTIFICATION_CONST,
    NotificationGet
  );
  if (getNotification.error) {
    return errorResponse(getNotification.error);
  }
  return NextResponse.json(getNotification);
}
