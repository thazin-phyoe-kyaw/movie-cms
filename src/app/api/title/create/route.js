import { authOptions } from "@/lib/auth";

import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { createTitle } from "@/modules/contentServiceModule/services";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CONTENT_CREDIT_CREATE")) {
    return unauthorizeResponse();
  }

  const { keywords, titleEn, titleMm, descriptionEn, descriptionMm } =
    await request.json();

  const createData = await createTitle({
    keywords,
    titleEn,
    titleMm,
    descriptionEn,
    descriptionMm,
    type: "series",
    isPremium: true,
    resolution: "SD",
    rating: 4,
    sorting: 2,
    status: false,
    statusType: null,
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    createdBy: session.user?.id ? session.user.id : "",
    updatedBy: session.user?.id ? session.user.id : "",
  });

  if (createData.error) {
    return errorResponse(createData.error);
  }

  return NextResponse.json(createData);
}
