import { AuthOptions } from "next-auth";
import {
    errorResponse,
    getCurrentDate,
    permissionHandler,
    successResponse,
    unauthorizeResponse,
} from "@/lib/globalFunctions";
import { PaymentGatewayEdit } from "@/modules/subscriptionModule/paymentGateWayModule/services";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (permissionHandler(session, "SUBSCRIPTION_PAYMENT_GATEWAY_UPDATE")) {
        return unauthorizeResponse();
    }
    const {
        platform,
        active,
        gateWayImage,
        source,
        id } = await request.json();
    if (!id) {
        return errorResponse("Data require");
    }

    const updateData = await PaymentGatewayEdit(
        {
            platform,
            active,
            gateWayImage,
            updatedAt: getCurrentDate(),
            updatedBy: session.user?.id ? session.user.id : "",
        },
        id
    );


    if (updateData.error) {
        return errorResponse(updateData.error);
    }
    return successResponse();
}