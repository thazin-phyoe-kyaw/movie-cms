import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { CMSUserDelete } from "@/modules/cmsModule/controller";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  // check access permission
  if (permissionHandler(session, "CMS_USER_DELETE")) {
    return unauthorizeResponse();
  }

  //check require data
  const { id } = await request.json();

  if (!id) {
    return errorResponse("User not found");
  }

  const deleteResult = await CMSUserDelete(id);

  if (deleteResult.error) {
    return errorResponse();
  }

  return successResponse();
}
