import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { ADItemsPublish } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (permissionHandler(session, "DISPLAY_ADS_ITEMS_EDIT")) {
    return unauthorizeResponse();
  }
  const { id, isPublish } = await request.json();

  if (!id) {
    return errorResponse("AdItem id required");
  }

  const updateData = await ADItemsPublish(
    {
      status: !isPublish,
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
