import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  passwordChecker,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { UserCreate } from "@/modules/cmsModule/services";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  //check access permission
  if (permissionHandler(session, "CMS_USER_CREATE")) {
    return unauthorizeResponse();
  }

  const {
    name,
    email,
    password,
    accessLevelId,
    phoneNumber,
    address,
    siteAdminNote,
  } = await request.json();

 

  if (!name || !email || !password || !accessLevelId) {
    return errorResponse();
  }

  // email validate check
  const regexStr = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if(!regexStr.test(email)){
    return errorResponse("Email wrong format")
  }

  // password validate check
  if(!passwordChecker(password)){
    return errorResponse('Wrong password format')
  }

  // crete user
  const create = await UserCreate({
    name,
    email,
    password,
    accessLevelId,
    phoneNumber: phoneNumber ? phoneNumber : "undefined",
    address: address ? address : "undefined",
    siteAdminNote: siteAdminNote ? siteAdminNote : "undefined",
    avatar: "undefined",
  });


  if (create.error) {
    return errorResponse();
  }
  return successResponse();
}
