import { AuthOptions } from "next-auth";
import { PLATFORM_ENUM_SUBSCRIPTION_GATEWAYS } from "@/lib/const";
import {
    errorResponse,
    getCurrentDate,
    permissionHandler,
    successResponse,
    unauthorizeResponse,
} from "@/lib/globalFunctions";
import { PaymentGatewayCreate } from "@/modules/subscriptionModule/paymentGateWayModule/services";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request) {
    const session = await getServerSession(authOptions);

    //check access permission
    if (permissionHandler(session, "SUBSCRIPTION_PAYMENT_PLAN_CREATE")) {
        return unauthorizeResponse();
    }
    const { platform, active, source } = await request.json();

    if (
        !PLATFORM_ENUM_SUBSCRIPTION_GATEWAYS.includes('Apple') ||
        !PLATFORM_ENUM_SUBSCRIPTION_GATEWAYS.includes('Google') ||
        !PLATFORM_ENUM_SUBSCRIPTION_GATEWAYS.includes('MPT') ||
        !PLATFORM_ENUM_SUBSCRIPTION_GATEWAYS.includes('Atom') ||
        !PLATFORM_ENUM_SUBSCRIPTION_GATEWAYS.includes('Kpay') ||
        !PLATFORM_ENUM_SUBSCRIPTION_GATEWAYS.includes('Wave') ||
        !PLATFORM_ENUM_SUBSCRIPTION_GATEWAYS.includes('Wave') ||
        !PLATFORM_ENUM_SUBSCRIPTION_GATEWAYS.includes('Mahar')
    ) {
        return errorResponse("Wrong ENUM")
    }
    const saveData = await PaymentGatewayCreate({

        platform,
        active,
        gateWayImage,
        source,
        createdAt: getCurrentDate(),
        updatedAt: getCurrentDate(),
        createdBy: session.user.id,
        updatedBy: session.user.id,
    });

    if (saveData.error) {
        return errorResponse(saveData.error);
    }

    return successResponse();
}