import { apiGetData } from "@/lib/apiQueryHandler";
import { authOptions } from "@/lib/auth";
import { GetCMSUserById } from "@/lib/generalApis";
import {
  errorResponse,
  getQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { QUERY_SUBSCRIPTION_PAYMENT_GATEWAY_CONST } from "@/lib/queryConst";
import { PaymentGatewayGet } from "@/modules/subscriptionModule/paymentGateWayModule/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "SUBSCRIPTION_PAYMENT_GATEWAY_READ")) {
    return unauthorizeResponse();
  }

  const query = await getQuery(request.url);

  // get gateway list
  const gateWaysList = await apiGetData(
    query,
    QUERY_SUBSCRIPTION_PAYMENT_GATEWAY_CONST,
    PaymentGatewayGet
  );
  if (gateWaysList.error) {
    return errorResponse("Gate waylist get error");
  }
  // get cmsUser by gateWaylist
  const userDataList = await GetCMSUserById([
    ...new Set(
      gateWaysList.value
        .map((gatewayObject) => gatewayObject.updatedBy)
        .filter((cmsUserId) => cmsUserId)
    ),
  ]);

  if (!userDataList.error) {
    const updatedGateWaysList = gateWaysList.value.map((gatewayObject) => {
      const userEntry = userDataList.find(
        (user) => user.id === gatewayObject.updatedBy
      );
      return {
        ...gatewayObject,
        updatedBy: userEntry ? userEntry.name : "unknown",
      };
    });

    return NextResponse.json({ ...gateWaysList, value: updatedGateWaysList });
  }

  return NextResponse.json(gateWaysList);
}
