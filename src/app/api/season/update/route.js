import { authOptions } from "@/lib/auth";

import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { updateSeason } from "@/modules/contentServiceModule/services";

import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CONTENT_SERIE_UPDATE")) {
    return unauthorizeResponse();
  }

  const { seriesId, keywords, nameMm, nameEn, title, publishDate, id } =
    await request.json();

  if (!seriesId) {
    return errorResponse("Data require");
  }

  const createData = await updateSeason(
    {
      seriesId,
      keywords,
      nameMm,
      nameEn,
      title: title ? title : null,
      status: false,
      sorting: 2,
      publishDate,
      deletedAt: null,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
      createdBy: session.user?.id ? session.user.id : "",
      updatedBy: session.user?.id ? session.user.id : "",
    },
    id
  );

  if (createData.error) {
    return errorResponse(createData.error);
  }

  return successResponse();
}
