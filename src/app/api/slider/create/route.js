import { authOptions } from "@/lib/auth";
import { ADS_ENUM_BANNER } from "@/lib/const";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { SliderCreate } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "DISPLAY_SLIDER_CREATE")) {
    return unauthorizeResponse();
  }

  const {
    name,
    displayLocation,
    bannerType,
    htmlCode,
    webLink,
    imageUrl,
    titleId,
  } = await request.json();
  if (!name || !bannerType || !titleId || !displayLocation) {
    return errorResponse("Data require");
  }

  if (!ADS_ENUM_BANNER.includes(bannerType)) {
    return errorResponse("Wrong Banner Type");
  }

  if (bannerType === "htmlCode" && !htmlCode) {
    return errorResponse("Html Code is required");
  }

  if (bannerType !== htmlCode && (!webLink || !imageUrl)) {
    return errorResponse("weblink or imageurl required");
  }

  const sequence = 2;
  const createData = await SliderCreate({
    name,
    bannerType,
    htmlCode: htmlCode ? htmlCode : "",
    webLink: webLink ? webLink : "",
    displayLocation,
    imageUrl: imageUrl ? imageUrl : "",
    status: true,
    titleId,
    sequence,

    deletedBy: session.user?.id ? session.user.id : "",
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
