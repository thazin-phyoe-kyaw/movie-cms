import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import {
  ADItemDelete,
  AdListDelete,
  StramingDataDelete,
} from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "DISPLAY_ADS_STREAMING_DELETE")) {
    return unauthorizeResponse();
  }
  const { id } = await request.json();
  if (!id) {
    return errorResponse("Streaming Data not found");
  }
  const deleteData = await StramingDataDelete(
    {
      deletedAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
      updatedBy: session.user?.id ? session.user.id : "",
      deletedBy: session.user?.id ? session.user.id : "",
      createdAt: getCurrentDate(),
      createdBy: session.user?.id ? session.user.id : "",
    },
    id
  );

  if (deleteData.error) {
    return errorResponse(deleteData.error);
  }

  return successResponse();
}
