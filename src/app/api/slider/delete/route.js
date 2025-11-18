import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { SliderDelete } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "DISPLAY_SLIDER_DELETE")) {
    return unauthorizeResponse();
  }

  const { id } = await request.json();
  if (!id) {
    return errorResponse("Slider  not found");
  }
  const deleteData = await SliderDelete(
    {
      deletedAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
      updatedBy: session.user?.id ? session.user.id : "",
      deletedBy: session.user?.id ? session.user.id : "",
    },
    id
  );

  if (deleteData.error) {
    return errorResponse(deleteData.error);
  }

  return successResponse();
}
