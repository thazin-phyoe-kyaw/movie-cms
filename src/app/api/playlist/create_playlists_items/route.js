import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { PlaylistandItemCreate } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "DISPLAY_PLAYLiST_CREATE")) {
    return unauthorizeResponse();
  }

  const { titleEn, titleMy, playlistLocation, viewType, titleId } =
    await request.json();
  if (!titleEn || !titleMy || !playlistLocation || !viewType) {
    return errorResponse("Data require");
  }

  const sequence = 2;
  const adminPlaylistTitles = titleId.map((item) => ({
    titleId: item,
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    createdBy: session.user?.id ? session.user.id : "",
    updatedBy: session.user?.id ? session.user.id : "",
  }));

  const createData = await PlaylistandItemCreate({
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
    adminPlaylistTitles,
  });

  if (createData.error) {
    return errorResponse(createData.error);
  }

  return successResponse();
}
