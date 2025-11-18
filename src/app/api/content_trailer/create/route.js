import { authOptions } from "@/lib/auth";

import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { createTrailer } from "@/modules/contentServiceModule/services";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CONTENT_TRAILER_CREATE")) {
    return unauthorizeResponse();
  }

  const { nameMm, nameEn, titleId, trailerUrl } = await request.json();

  const createData = await createTrailer({
    titleId,
    status: true,
    sorting: 0,
    nameMm,
    nameEn,
    trailerUrl,
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
