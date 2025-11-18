import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { AdListDelete } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "DISPLAY_ADS_LIST_DELETE")) {
    return unauthorizeResponse();
  }

  const { id } = await request.json();
  if (!id) {
    return errorResponse("Ad list not found");
  }

  // check ad list exist

  // delete ad list
  const deleteData = await AdListDelete(
    {
      deletedAt: getCurrentDate(),
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
