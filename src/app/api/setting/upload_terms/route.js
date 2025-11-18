// pages/api/upload.js
import {
  errorResponse,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { fileUploadHanlder } from "@/lib/fileupload";
import { writeFile } from "fs/promises";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (permissionHandler(session, "SETTING_UPDATE")) {
    return unauthorizeResponse();
  }

  const data = await req.formData();
  const fileName = data.get("terms_mm") ? "terms_mm.pdf" : "terms_en.pdf";
  const file = data.get("terms_mm") || data.get("terms_en"); // get file from upload

  if (!file) {
    return errorResponse("Require data!");
  }

  await writeFile(
    `public/temp_files/source.pdf`,
    Buffer.from(await file.arrayBuffer())
  );

  const result = await fileUploadHanlder(
    `public/temp_files/source.pdf`,
    fileName
  ); // upload to akamai

  console.log("result", result);

  //return full akamai file url here
  return NextResponse.json({ url: "here" }, { status: 200 });
}
