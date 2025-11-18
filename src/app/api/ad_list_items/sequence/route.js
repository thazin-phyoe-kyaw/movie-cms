import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { ADItemsSequence } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "DISPLAY_ADS_LIST_EDIT")) {
    return unauthorizeResponse();
  }

  const data = await request.json();

  let requests = [];

  for (let { id, sequence } of data) {
    if (id && sequence) {
      requests = [
        ...requests,
        {
          id,
          method: "PATCH",
          url: `AdsItem(${id})`,
          headers: { "content-type": "application/json" },
          body: { sequence },
        },
      ];
    }
  }

  const updateSequence = await ADItemsSequence({ requests });

  if (updateSequence.error) {
    return errorResponse(updateSequence.error);
  }

  return successResponse();
}
