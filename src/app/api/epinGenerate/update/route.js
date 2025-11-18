import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getCurrentDate,
  permissionHandler,
  successResponse,
} from "@/lib/globalFunctions";
import { EpinGenerateUpdate } from "@/modules/epinServiceModule/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "EPIN_EPIN_GENERATION_JOB_READ")) {
    return NextResponse.json(
      { message: "Unauthorize request" },
      { status: 401 }
    );
  }
  const { id, description} = await request.json();
  if (!id) {
    return errorResponse("Required data");
  }
  const updateEpinGenerate = await EpinGenerateUpdate(
    {
      description,
      updatedAt: getCurrentDate(),
      updatedBy: session.user?.id ? session.user.id :"",
    },
    id
  );

//   if (status !== "active") {
//     const updateEpin = await EpinUpdate(
//       {
//         status,
//         updatedAt: getCurrentDate(),
//         updatedBy: session.user.id,
//       },
//       epinGenerationJobId
//     );
//     if (updateEpin.error) {
//       return errorResponse(updateEpin.error);
//     }
//   }

  if (updateEpinGenerate.error) {
    return errorResponse(updateEpinGenerate.error);
  }
  return successResponse();
}
