import { authOptions } from "@/lib/auth";

import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { createSeason } from "@/modules/contentServiceModule/services";

import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CONTENT_CREDIT_CREATE")) {
    return unauthorizeResponse();
  }

  const { seriesId, keywords, nameMm, nameEn, title, publishDate } =
    await request.json();

  if (!seriesId) {
    return errorResponse("Data require");
  }
  const createData = await createSeason({
    seriesId,
    keywords,
    nameMm,
    nameEn,
    title: title ? title : null,
    status: false,
    statusType: null,
    sorting: 2,
    publishDate,
    deletedAt: null,
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
