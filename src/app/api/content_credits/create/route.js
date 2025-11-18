import { authOptions } from "@/lib/auth";

import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { createCredit } from "@/modules/contentServiceModule/services";

import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CONTENT_CREDIT_CREATE")) {
    return unauthorizeResponse();
  }

  const {
    nameMm,
    nameEn,
    keywords,
    profileImage,
    coverImage,
    actorAcademy,
    directorAcademy,
    ownerAcademy,
    bioEn,
    bioMm,
    startYear,
    endYear,
  } = await request.json();

  if (!nameMm || !nameEn) {
    return errorResponse("Data require");
  }

  const createData = await createCredit({
    nameEn,
    nameMm,
    keywords,
    sorting: 0,
    profileImage,
    coverImage,
    actorAcademy,
    directorAcademy,
    ownerAcademy,
    bioEn,
    bioMm,
    startYear,
    endYear,
    status: false,
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
