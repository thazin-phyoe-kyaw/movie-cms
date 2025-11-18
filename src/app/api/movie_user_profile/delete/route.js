import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { getServerSession } from "next-auth";
import { ProfileDelete } from "@/modules/profileServiceModule/services";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "PROFILE_SERVICE_PROFILE_DELETE")) {
    return unauthorizeResponse();
  }

  const { id } = await request.json();

  if (!id) {
    return errorResponse("Profile not found");
  }

  // check ad list exist

  // delete ad list
  const deleteData = await ProfileDelete(
    {
      status: "deleteByAdmin",
      updatedAt: getCurrentDate(),
      updatedBy: session.user?.id ? session.user.id : "",
    },
    id
  );

  if (deleteData.error) {
    return errorResponse(deleteData.error);
  }

  return successResponse();
}
