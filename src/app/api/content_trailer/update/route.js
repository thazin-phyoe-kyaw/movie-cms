import { authOptions } from "@/lib/auth";

import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import {
  updateTag,
  updateTrailer,
} from "@/modules/contentServiceModule/services";

import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CONTENT_TRAILER_EDIT")) {
    return unauthorizeResponse();
  }

  const { nameMm, nameEn, id, titleId, trailerUrl } = await request.json();

  const updateData = await updateTrailer(
    {
      titleId,
      status: false,
      sorting: 0,
      nameMm,
      nameEn,
      trailerUrl,
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
