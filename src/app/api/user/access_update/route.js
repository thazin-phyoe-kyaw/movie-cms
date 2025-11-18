import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { UserAccessLvlUpdate } from "@/modules/cmsModule/services";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  // check access permission
  if (permissionHandler(session, "CMS_USER_ACCESS_EDIT")) {
    return unauthorizeResponse();
  }
  const { userId, accessLevelId } = await request.json();
  if (!userId || !accessLevelId) {
    return errorResponse("Data required");
  }
  const update = await UserAccessLvlUpdate(userId, {
    accessLevelId,
    updatedAt: getCurrentDate(),
  });
  if (update.error) {
    return errorResponse();
  }
  return successResponse();
}
