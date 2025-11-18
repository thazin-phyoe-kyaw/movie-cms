import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { PromocodeDelete } from "@/modules/promocodeModule/services";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "PROMOCODE_SERVICE_DELETE")) {
    return unauthorizeResponse();
  }

  const { id } = await request.json();
  
  if (!id) {
    return errorResponse("Promocode not found");
  }
  const deleteResult = await PromocodeDelete(
    {
      updatedAt: getCurrentDate(),
      deleteAt: getCurrentDate(),
    },
    id);
  if (deleteResult.error) {
    return errorResponse(deleteResult.error);
  }
  return successResponse();
}
