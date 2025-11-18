import { authOptions } from "@/lib/auth";
import { errorResponse, paginationQuery, permissionHandler, unauthorizeResponse } from "@/lib/globalFunctions";
import { PaymentGatewayGet } from "@/modules/subscriptionModule/paymentGateWayModule/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
    const session = await getServerSession(authOptions)

    if (permissionHandler(session, 'SUBSCRIPTION_PLAN_GATEWAY_READ')) {
        return unauthorizeResponse()
    }

    const query = await request.query();

    const pagination = paginationQuery(query);

    const getData = await PaymentGatewayGet(`?$count=true&$select=id,platform&$filter=active eq true${query.name && query.name !== "" ? `and startWith(platform,'${query.name}')` : `&$orderby=createdAt desc`}&${pagination}`)

    if (getData.error) {
        return errorResponse(getData.error)
    }

    return NextResponse.json(getData)
}