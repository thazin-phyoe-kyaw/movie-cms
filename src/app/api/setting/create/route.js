import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { FAQCreate, FAQGet } from "@/modules/Setting/service";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (permissionHandler(session, "SETTING_READ")) {
    return unauthorizeResponse();
  }

  const { questionEn, questionMm, answerEn, answerMm, faqtitleId, status } =
    await request.json();

  if (!questionEn || !questionMm || !answerEn || !answerMm || !faqtitleId) {
    return errorResponse("Require Data!");
  }

  const sequence = 111;
  const saveData = await FAQCreate({
    questionEn,
    questionMm,
    answerEn,
    answerMm,
    sequence,
    faqtitleId,
    status,
    createdAt: getCurrentDate(),
  });

  if (saveData.error) {
    return errorResponse();
  }

  return successResponse();
}
