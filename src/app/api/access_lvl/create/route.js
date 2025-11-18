import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getAccessPermissions,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { AccessLvlCreate } from "@/modules/cmsModule/services";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  // check access permission
  if (permissionHandler(session, "ACCESS_CREATE")) {
    return unauthorizeResponse();
  }

  const { name, description, roles } = await request.json();

  // check require data
  if (!name || !description || !roles) {
    return errorResponse("Require data");
  }

  const { accessRoles, accessPermissions } = getAccessPermissions(roles);

  if (accessPermissions.length === 0) {
    return errorResponse("Permission required");
  }

  // add access lvl
  const data = await AccessLvlCreate({
    name,
    description,
    roles: accessRoles,
    permissions: accessPermissions,
  });

  if (data.error) {
    return errorResponse();
  }

  return successResponse();
}
