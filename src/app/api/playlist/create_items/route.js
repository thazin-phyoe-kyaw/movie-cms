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
          method: "POST",
          url: "AdminPlaylistTitle",
          headers: { "content-type": "application/json" },
          body: {
            playlistId: "107db84f-6133-4a54-9cf8-42da1f3910ba",
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
