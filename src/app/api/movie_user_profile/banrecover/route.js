import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";

import { getServerSession } from "next-auth";
import { ProfileDelete } from "@/modules/profileServiceModule/services";
import { PROFILE_ENUM_STATUS } from "@/lib/const";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "PROFILE_SERVICE_PROFILE_DELETE")) {
    return unauthorizeResponse();
  }

  const { id, status } = await request.json();

  if (!id || !status) {
    return errorResponse("Profile not found");
  }

  if (!PROFILE_ENUM_STATUS.includes(status)) {
    return errorResponse("wrong enum");
  }

  // check ad list exist

  // delete ad list
  const deleteData = await ProfileDelete(
    {
      status,
      updatedAt: getCurrentDate(),
      updatedBy: session.user?.id ? session.user.id : "",
    },
    id
  );

  if (deleteData.error) {
    return errorResponse(deleteData.error);
  }

  return successResponse();
}
