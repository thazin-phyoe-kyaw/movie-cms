import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { AdListSequence } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "DISPLAY_ADS_LIST_EDIT")) {
    return unauthorizeResponse();
  }

  const data = await request.json();
 console.log(data)
  let requests = [];

  for (let { id, sequence } of data) {
    if (id && sequence) {
      requests = [
        ...requests,
        {
          id,
          method: "PATCH",
          url: `AdsList(${id})`,
          headers: { "content-type": "application/json" },
          body: {
            sequence,
            updatedAt: getCurrentDate(),
            updatedBy: session.user ? session.user?.id : "",
          },
        },
      ];
    }
  }

  const updateSequence = await AdListSequence({ requests });

  if (updateSequence.error) {
    return errorResponse(updateSequence.error);
  }

  return successResponse();
}
