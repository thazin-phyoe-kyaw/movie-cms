import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  passwordChecker,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { PasswordReset } from "@/modules/cmsModule/services";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  // check permission
  if (permissionHandler(session, "CMS_USER_PASSWORD")) {
    return unauthorizeResponse();
  }

  // check data
  const { email, password } = await request.json();

  if (!email || !password) {
    return errorResponse("Daata require");
  }

  // password validate check
  if (!passwordChecker(password)) {
    return errorResponse("Wrong password format");
  }

  // reset password
  const result = await PasswordReset({ email, password });

  if (result.error) {
    return errorResponse();
  }

  return successResponse();
}
