import { AuthOptions } from "next-auth";
import {
    errorResponse,
    getCurrentDate,
    permissionHandler,
    successResponse,
    unauthorizeResponse,
} from "@/lib/globalFunctions";
import { SubscriptionPlanCreate } from "@/modules/subscriptionModule/subscriptionPlanModule/services";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request) {
    const session = await getServerSession(authOptions);

    if (permissionHandler(session, "SUBSCRIPTION_SUBSCRIPTIONPLAN_CREATE")) {
        return unauthorizeResponse();
    }
    const {
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

    if (!gateWays) {
        return errorResponse("Data Require");
    }

    const saveData = await SubscriptionPlanCreate({
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
