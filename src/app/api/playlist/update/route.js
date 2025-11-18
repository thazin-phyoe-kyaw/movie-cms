import { authOptions } from "@/lib/auth";
import { ADS_ENUM_BANNER } from "@/lib/const";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { PlaylistUpdate } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "DISPLAY_PLAYLiST_CREATE")) {
    return unauthorizeResponse();
  }

  const { titleEn, titleMy, playlistLocation, id } = await request.json();
  if (!titleEn || !titleMy || !playlistLocation) {
    return errorResponse("Data require");
  }
  const sequence = 2;
  const viewType = 2;
  const createData = await PlaylistUpdate(
    {
      titleEn,
      titleMy,
      playlistLocation,
      sequence,
      viewType,
      status: true,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
      createdBy: session.user?.id ? session.user.id : "",
      updatedBy: session.user?.id ? session.user.id : "",
    },
    id
  );

  if (createData.error) {
    return errorResponse(createData.error);
  }

  return successResponse();
}
