import { authOptions } from "@/lib/auth";

import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { createEpisode } from "@/modules/contentServiceModule/services";

import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CONTENT_CREDIT_CREATE")) {
    return unauthorizeResponse();
  }

  const {
    keywords,
    titleMm,
    titleEn,
    descriptionEn,
    descriptionMm,
    posterPortrait,
    posterLandscape,
    fullHdFileSize,
    hdFileSize,
    sdFileSize,
    streamingUrl,
    downloadUrl,
    duration,
    seasonId,
  } = await request.json();

  if (!seasonId) {
    return errorResponse("Data require");
  }

  const createData = await createEpisode({
    titleMm,
    titleEn,
    isPremium: false,
    keywords,
    duration,
    fullHdFileSize,
    hdFileSize,
    sdFileSize,
    streamingUrl,
    downloadUrl,
    sorting: 2,
    status: false,
    statusType: null,
    descriptionEn,
    descriptionMm,
    posterPortrait,
    posterLandscape,
    seasonId,
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
