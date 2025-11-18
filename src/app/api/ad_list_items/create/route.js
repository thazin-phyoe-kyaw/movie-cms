import { authOptions } from "@/lib/auth";
import { ADS_ENUM_BANNER } from "@/lib/const";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { ADItemsCreate } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "DISPLAY_ADS_ITEMS_CREATE")) {
    return unauthorizeResponse();
  }

  const { adsListId, name, bannerType, htmlCode, webLink, imageUrl, titleId } =
    await request.json();
  if (!adsListId || !name || !bannerType || !titleId) {
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

  const sequence = 111;

  const createData = await ADItemsCreate({
    adsListId,
    name,
    bannerType,
    htmlCode: htmlCode ? htmlCode : "",
    webLink: webLink ? webLink : "",
    imageUrl: imageUrl ? imageUrl : "",
    titleId,
    sequence,
    clickCount: 0,
    viewCount: 0,
    status: true,
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
