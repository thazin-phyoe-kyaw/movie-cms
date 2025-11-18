// pages/api/upload.js
import {
  errorResponse,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import path from "path";
import fs from "fs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fileUploadHanlder } from "@/lib/fileupload";
import { privacyAndPoliciesCreate } from "@/modules/Setting/service";

const config = {
  api: {
    bodyParser: {
      sizeLimit: "80mb",
    },
  },
  maxDuration: 5,
};

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (permissionHandler(session, "SETTING_UPDATE")) {
    return unauthorizeResponse();
  }
  try {
    const data = await req.formData();
    const file = data.get("file");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes).toString("base64");

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = new Date().valueOf() + "_" + file.name;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);
    let result = await fileUploadHanlder(filePath, fileName);
    let saveData = await privacyAndPoliciesCreate(result);
    console.log(saveData);
    await fs.unlinkSync(filePath);

    if (saveData.error) {
      return errorResponse();
    }
    return successResponse();
  } catch (e) {
    return errorResponse();
  }
}
