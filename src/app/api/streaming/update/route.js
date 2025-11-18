import { authOptions } from "@/lib/auth";
import { ADS_ENUM_BANNER } from "@/lib/const";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { StreamUpdate } from "@/modules/displayServiceModule/service";

import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "DISPLAY_ADS_STREAMING_UPDAET")) {
    return unauthorizeResponse();
  }
  const {
    adsStreamingUrl,
    adsStreamingType,
    adsStartTime,
    status,
    targetUser,
    id,
  } = await request.json();

  const editData = await StreamUpdate(
    {
      adsStreamingUrl,
      adsStreamingType,
      adsStartTime,
      status: status ? status : false,
      targetUser,
      status: true,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
      createdBy: session.user?.id ? session.user.id : "",
      updatedBy: session.user?.id ? session.user.id : "",
    },
    id
  );
  if (editData.error) {
    return errorResponse(editData.error);
  }

  return successResponse();
}
