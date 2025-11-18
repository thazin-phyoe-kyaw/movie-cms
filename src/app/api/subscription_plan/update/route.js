import { authOptions } from "@/lib/auth";
import {
    errorResponse,
    getCurrentDate,
    permissionHandler,
    successResponse,
    unauthorizeResponse,
} from "@/lib/globalFunctions";
import { SubscriptionPlanEdit } from "@/modules/subscriptionModule/subscriptionPlanModule/services";
import { getServerSession } from "next-auth";

export async function POST(request) {
    const session = await getServerSession(authOptions);

    if (permissionHandler(session, "SUBSCRIPTION_PAYMENT_PLAN_UPDATE")) {
        return unauthorizeResponse();
    }
    const {
        id,
        titleMm,
        titleEng,
        descriptionMm,
        descriptionEng,
        featuredImage,
        duration,
        gateWays,
        costDisplay,
        currency,
        active,
        planId,
        termsAndConditionMm,
        termsAndConditionEng
    } = await request.json();

    if (!id || !gateWays) {
        return errorResponse("Data Require");
    }
    const editData = await SubscriptionPlanEdit(
        {

            titleMm,
            titleEng,
            descriptionMm,
            descriptionEng,
            featuredImage,
            duration,
            gateWays,
            costDisplay,
            currency,
            active,
            planId,
            termsAndConditionMm,
            termsAndConditionEng,
            updatedAt: getCurrentDate(),
            updatedBy: session.user?.id ? session.user.id : "",
        },
        id
    );

    if (editData.error) {
        return errorResponse(editData.error);
    }

    return successResponse();
}
