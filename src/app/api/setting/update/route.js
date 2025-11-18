import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
} from "@/lib/globalFunctions";
import { FAQUpdate } from "@/modules/Setting/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "SETTING_READ")) {
    return NextResponse.json(
      { message: "Unauthorize request" },
      { status: 401 }
    );
  }

  const { id, questionEn, questionMm, answerEn, answerMm, status, faqtitleId } =
    await request.json();
  if (!id) {
    return errorResponse("Require Data!");
  }
  const updateData = await FAQUpdate(
    {
      questionEn,
      questionMm,
      answerEn,
      answerMm,
      status,
      faqtitleId,
      updatedAt: getCurrentDate(),
      updatedBy: session.user?.id ? session.user.id : "",
    },
    id
  );

  if (updateData.error) {
    return errorResponse();
  }
  return successResponse();
}
