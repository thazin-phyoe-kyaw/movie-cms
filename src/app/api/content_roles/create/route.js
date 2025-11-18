import { authOptions } from "@/lib/auth";

import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { createRole } from "@/modules/contentServiceModule/services";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CONTENT_ROLE_CREATE")) {
    return unauthorizeResponse();
  }

  const { nameMm, nameEn } = await request.json();
  if (!nameMm || !nameEn) {
    return errorResponse("Data require");
  }

  const createData = await createRole({
    nameMm,
    nameEn,
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    createdBy: session.user?.id ? session.user.id : "",
    updatedBy: session.user?.id ? session.user.id : "",
  });

  if (createData.error) {
    return errorResponse(createData.error);
  }

  return successResponse();
}
