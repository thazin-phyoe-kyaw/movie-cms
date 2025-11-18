import { authOptions } from "@/lib/auth";
import { ADS_ENUM_ADS_LOCATION, ADS_ENUM_IMAGE_RATIO } from "@/lib/const";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import {
  AdListCreate,
  GETADList,
} from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  // check access permission
  if (permissionHandler(session, "DISPLAY_ADS_LIST_CREATE")) {
    return unauthorizeResponse();
  }
  const { adsLocation, imageRatio } = await request.json();
  if (!adsLocation || !imageRatio) {
    return errorResponse("Data require");
  }
  if (
    !ADS_ENUM_ADS_LOCATION.includes(adsLocation) ||
    !ADS_ENUM_IMAGE_RATIO.includes(imageRatio)
  ) {
    return errorResponse("wrong enum");
  }

  // get current ad list for sequence order
  const sequence = await GETADList(
    `?$count=true&$filter=deletedAt eq null&$top=0`
  );

  const saveData = await AdListCreate({
    sequence: sequence["@odata.count"] ? sequence["@odata.count"] + 1 : 111,
    status: false,
    adsLocation,
    imageRatio,
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate(),
    createdBy: session.user.id,
    updatedBy: session.user.id,
  });
  if (saveData.error) {
    return errorResponse(saveData.error);
  }

  return successResponse();
}
