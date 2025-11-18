import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getQuery,
  paginationQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { SubscriptionPlanGet } from "@/modules/subscriptionModule/subscriptionPlanModule/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (
    permissionHandler(
      session,
      "EPIN_EPIN_READ,PROMOCODE_SERVICE_TITLE_ID_READ,DISPLAY_ADS_ITEMS_READ,PROFILE_SERVICE_FAVOURITE_READ,PROFILE_SERVICE_LIKE_READ,PROFILE_SERVICE_DOWNLOAD_READ,PROFILE_SERVICE_USER_SHARE_READ"
    )
  ) {
    return unauthorizeResponse();
  }
  const query = await getQuery(request.url);

  const pagination = paginationQuery(query);
  // console.log(query)
  const getDataPlanId = await SubscriptionPlanGet(
    // `?$select=id,topicName&$filter=startsWith(topicName,'${query.name}')`
    `?$select=planId&$filter=active eq true and PaymentGateway/Platform eq SubscriptionService.Models.Platform'Mahar' and startsWith(planId,'${query.name}')` //&${pagination}`
  );
  //console.log(getDataPlanId)
  if (getDataPlanId.error) {
    return errorResponse(getDataPlanId.error);
  }
  return NextResponse.json(getDataPlanId);
}
