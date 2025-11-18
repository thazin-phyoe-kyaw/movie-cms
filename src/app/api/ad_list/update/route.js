import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { AdListEdit, GETADList } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";
import { ADS_ENUM_ADS_LOCATION } from "@/lib/const";
export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "DISPLAY_ADS_LIST_EDIT")) {
    return unauthorizeResponse();
  }

  const { adsLocation, id } = await request.json();

  if (!adsLocation || !id) {
    return errorResponse("Data require");
  }

  if (!ADS_ENUM_ADS_LOCATION.includes(adsLocation)) {
    return errorResponse("wrong enum");
  }

  //check ad list exist
  const getList = await GETADList(`$filter=id eq ${id}`);

  // update ad list
  const editData = await AdListEdit(
    {
      adsLocation,
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
