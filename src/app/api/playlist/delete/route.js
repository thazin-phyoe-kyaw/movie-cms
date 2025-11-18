import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { PlaylistDelete } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "DISPLAY_PLAYLIST_DELETE")) {
    return unauthorizeResponse();
  }

  const { id, status } = await request.json();
  if (!id) {
    return errorResponse("Playlist not found");
  }
  const deleteData = await PlaylistDelete(
    {
      status: false,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
      updatedBy: session.user?.id ? session.user.id : "",
      createdBy: session.user?.id ? session.user.id : "",
    },
    id
  );
  console.log(deleteData);
  if (deleteData.error) {
    return errorResponse(deleteData.error);
  }

  return successResponse();
}
