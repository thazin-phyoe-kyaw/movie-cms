
import { authOptions } from "@/lib/auth";
import { permissionHandler, successResponse } from "@/lib/globalFunctions";
import { FAQUpdate } from "@/modules/Setting/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (permissionHandler(session, "SETTING_UPDATE")) {
    return NextResponse.json(
      { message: "Unauthorize request" },
      { status: 401 }
    );
  }
  let data = await request.json();
  try {
    await Promise.all(
      data.map(async (ea) => {
        await FAQUpdate({"sequence" : ea.sequence}, ea.id);
      })
    );

    return successResponse();
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return NextResponse.json(
      { message: "Error updating FAQ" },
      { status: 500 }
    );
  }
}
