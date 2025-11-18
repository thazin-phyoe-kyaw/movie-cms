import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getAccessPermissions,
  permissionHandler,
  successResponse,
} from "@/lib/globalFunctions";
import { AccessLvlUpdate } from "@/modules/cmsModule/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "ACCESS_EDIT")) {
    return NextResponse.json(
      { message: "Unauthorize request" },
      { status: 401 }
    );
  }

  const { id, name, description, roles } = await request.json();

  if (!id || !name || !roles) {
    return errorResponse("Require data");
  }

  const { accessRoles, accessPermissions } = getAccessPermissions(roles);

  if (accessPermissions.length === 0) {
    return errorResponse("Permission required");
  }

  const update = await AccessLvlUpdate({
    id,
    name,
    description,
    roles: accessRoles,
    permissions: accessPermissions,
  });

  if (update.error) {
    return errorResponse();
  }
  return successResponse();
}
