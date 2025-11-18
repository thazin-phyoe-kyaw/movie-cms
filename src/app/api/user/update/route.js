import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { UserEdit } from "@/modules/cmsModule/services";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  // check permission
  if (permissionHandler(session, "CMS_USER_EDIT")) {
    return unauthorizeResponse();
  }

  const { name, phoneNumber, address,siteAdminNote ,avatar, id } = await request.json();

  if (!id || !name) {
    return errorResponse("User not found");
  }

  const update = await UserEdit(
    {
      name,
      phoneNumber: phoneNumber ? phoneNumber : "undefined",
      address: address ? address : "undefined",
      avatar: avatar ? avatar : "undefined",
      siteAdminNote,
      updatedAt: getCurrentDate(),
    },
    id
  );

  if (update.error) {
    return errorResponse();
  }

  return successResponse();
}
