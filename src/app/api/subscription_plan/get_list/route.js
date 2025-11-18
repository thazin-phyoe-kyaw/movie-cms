import {
  errorResponse,
  getQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { SubscriptionPlanGet } from "@/modules/subscriptionModule/subscriptionPlanModule/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

import { QUERY_SUBSCRIPTION_PLAN_CONST } from "@/lib/queryConst";
import { apiGetData } from "@/lib/apiQueryHandler";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "SUBSCRIPTION_PAYMENT_PLAN_READ")) {
    return unauthorizeResponse();
  }
  // Get query
  const query = await getQuery(request.url);

  // Get data


  const getPlans = await apiGetData(
    query,
    QUERY_SUBSCRIPTION_PLAN_CONST,
    SubscriptionPlanGet
  );
  return NextResponse.json(getPlans);
}
