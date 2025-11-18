import { authOptions } from "@/lib/auth";
import { ADS_ENUM_BANNER } from "@/lib/const";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import {
  ADItemsCreate,
  StreamingCreate,
} from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "DISPLAY_ADS_STREAMING_CREATE")) {
    return unauthorizeResponse();
  }
  const {
    adsStreamingUrl,
    adsStreamingType,
    adsStartTime,
    status,
    targetUser,
  } = await request.json();
  const createData = await StreamingCreate({
    adsStreamingUrl,
    adsStreamingType,
    adsStartTime,
    status: status ? status : false,
    targetUser,
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    createdBy: session.user?.id ? session.user.id : "",
    updatedBy: session.user?.id ? session.user.id : "",
  });

  if (createData.error) {
    return errorResponse(createData.error);
  }

  return successResponse();
}
