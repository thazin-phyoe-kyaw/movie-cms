import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { PlaylistItemCreate } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "DISPLAY_ADS_PLAYLIST_EDIT")) {
    return unauthorizeResponse();
  }
  let requests = [];

  const data = await request.json();
  for (let title of data.titles) {
    if (title) {
      requests = [
        ...requests,
        {
          id: title,
          method: "DELETE",
          url: "AdminPlaylistTitle",
          headers: { "content-type": "application/json" },
          body: {
            playlistId: "e4547508-c994-4cff-b041-35e0fe62bc8b",
            titleId: title,
            createdAt: getCurrentDate(),
            updatedAt: getCurrentDate(),
            createdBy: session.user?.id ? session.user.id : "",
            updatedBy: session.user?.id ? session.user.id : "",
          },
        },
      ];
    }
  }

  const updateSequence = await PlaylistItemCreate({ requests });

  if (updateSequence.error) {
    return errorResponse(updateSequence.error);
  }

  return successResponse();
}
