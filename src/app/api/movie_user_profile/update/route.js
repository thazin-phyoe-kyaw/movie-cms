import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getAccessPermissions,
  permissionHandler,
  successResponse,
} from "@/lib/globalFunctions";
import { ProfileUpdate } from "@/modules/profileServiceModule/services";
import moment from "moment";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "PROFILE_SERVICE_PROFILE_UPDATE")) {
    return NextResponse.json(
      { message: "Unauthorize request" },
      { status: 401 }
    );
  }

  const { id, name, phoneNumber, imageUrl , gender ,dateOfBirth } = await request.json();
  //console.log(id,name,phoneNumber,imageUrl,gender,dateOfBirth)
  if (!id || !name) {
    return errorResponse("Require data");
  }

  // const { accessRoles, accessPermissions } = getAccessPermissions(roles);

  // if (accessPermissions.length === 0) {
  //   return errorResponse("Permission required");
  // }
  const update = await ProfileUpdate({

    name,
    phoneNumber: phoneNumber ? phoneNumber : "unknown",
    imageUrl,
    gender,
    dateOfBirth: moment(dateOfBirth).format("YYYY-MM-DD")
  },
  id);

  //console.log(update)
  if (update.error) {
    return errorResponse();
  }
  return successResponse();
}
