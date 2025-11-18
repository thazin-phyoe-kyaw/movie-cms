import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { deleteGenre } from "@/modules/contentServiceModule/services";

import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CONTENT_GENRE_DELETE")) {
    return unauthorizeResponse();
  }

  const { id } = await request.json();
  if (!id) {
    return errorResponse("Genre not found");
  }
  const deleteData = await deleteGenre(
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
