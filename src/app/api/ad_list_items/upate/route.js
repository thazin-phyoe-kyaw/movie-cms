import { authOptions } from "@/lib/auth";
import { ADS_ENUM_BANNER } from "@/lib/const";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { ADItemsEdit } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "DISPLAY_ADS_ITEMS_EDIT")) {
    return unauthorizeResponse();
  }

  const { id, name, bannerType, htmlCode, webLink, imageUrl, titleId } =
    await request.json();

  if (!id || !name || !bannerType || !titleId) {
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

  // check title is avilable

  const editData = await ADItemsEdit(
    {
      name,
      bannerType,
      htmlCode: htmlCode ? htmlCode : "",
      webLink: webLink ? webLink : "",
      imageUrl: imageUrl ? imageUrl : "",
      titleId,
      updatedAt: getCurrentDate(),
      updatedBy: session.user?.id ? session.user.id : "",
    },
    id
  );

  if (editData.error) {
    return errorResponse(editData.error);
  }

  return successResponse();
}
