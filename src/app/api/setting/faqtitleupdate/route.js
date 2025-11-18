import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
} from "@/lib/globalFunctions";
import { FAQtitleUpdate } from "@/modules/Setting/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "SETTING_READ,SETTING_UPDATE")) {
    return NextResponse.json(
      { message: "Unauthorize request" },
      { status: 401 }
    );
  }

  const { id, titleEn, titleMm } = await request.json();
  if (!id) {
    return errorResponse("Require Data");
  }

  const updateData = await FAQtitleUpdate(
    {
      titleEn,
      titleMm,
      updatedAt: getCurrentDate(),
      updatedBy: session.user?.id ? session.user.id : "",
    },
    id);
  //console.log(updateData)
  if (updateData.error) {
    return errorResponse();
  }
  return successResponse();
}
