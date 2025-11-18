import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getQuery,
  paginationQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { TopicGet } from "@/modules/NotificationServiceModule/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "NOTIFICATION_READ")) {
    return unauthorizeResponse();
  }
  const query = await getQuery(request.url);
  const pagination = paginationQuery(query);
  if (query.name) {
    const getTopicData = await TopicGet(
      `?$select=id,topicName&$filter=startsWith(topicName,'${query.name}')`
    );

    if (getTopicData.error) {
      return errorResponse(getTopicData.error);
    }

    return NextResponse.json(getTopicData);
  } else {
    const allTopicData = await TopicGet(`?$select=id,topicName`);
    if (allTopicData.error) {
      return errorResponse(allTopicData.error);
    }

    return NextResponse.json(allTopicData);
  }
}
