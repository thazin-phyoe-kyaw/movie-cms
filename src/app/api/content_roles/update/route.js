import { authOptions } from "@/lib/auth";

import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { updateRole } from "@/modules/contentServiceModule/services";

import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CONTENT_ROlE_EDIT")) {
    return unauthorizeResponse();
  }

  const { nameMm, nameEn, id } = await request.json();

  const updateData = await updateRole(
    {
      nameMm,
      nameEn,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
      createdBy: session.user?.id ? session.user.id : "",
      updatedBy: session.user?.id ? session.user.id : "",
    },
    id
  );

  if (updateData.error) {
    return errorResponse(updateData.error);
  }

  return successResponse();
}
