import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import {
  PromocodeUpdate,
  PromocodeUserDelete,
} from "@/modules/promocodeModule/services";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "PROMOCODE_SERVICE_USER_DELETE")) {
    return unauthorizeResponse();
  }
  const { id, promoId, usedCount } = await request.json();

  if (!id || !promoId) {
    return errorResponse("Promocode User is not found");
  }
  const deleteUser = await PromocodeUserDelete(
    {
      updatedAt: getCurrentDate(),
      deleteAt: getCurrentDate(),
    },
    id
  );

  if (usedCount > 0) {
    const updatePromoCode = await PromocodeUpdate(
      {
        usedCount: usedCount - 1,
        updatedAt: getCurrentDate(),
        updatedBy: session.user.id,
      },
      promoId
    );

    if (updatePromoCode.error) {
      return errorResponse(updatePromoCode.error);
    }
  }

  if (deleteUser.error) {
    return errorResponse(deleteUser.error);
  }

  return successResponse();
}
