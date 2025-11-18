import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { SeriePublish } from "@/modules/contentServiceModule/services";
import { AdListPublish } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CONTENT_SERIE_DELETE")) {
    return unauthorizeResponse();
  }

  const { id, publish } = await request.json();

  if (!id) {
    return errorResponse("Series not found");
  }

  const deleteData = await SeriePublish(
    {
      status: !publish,
      updatedAt: getCurrentDate(),
      updatedBy: session.user?.id ? session.user.id : "",
    },
    id
  );

  if (deleteData.error) {
    return errorResponse(deleteData.error);
  }

  return successResponse();
}
