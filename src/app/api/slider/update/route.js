import { authOptions } from "@/lib/auth";

import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { SliderEdit } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "DISPLAY_SLIDER_EDIT")) {
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
    id,
  } = await request.json();

  const sequence = 2;
  const createData = await SliderEdit(
    {
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
    },
    id
  );

  if (createData.error) {
    return errorResponse(createData.error);
  }

  return successResponse();
}
