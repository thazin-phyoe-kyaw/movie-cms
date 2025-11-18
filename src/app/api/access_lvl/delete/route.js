import { authOptions } from "@/lib/auth";
import { CMS_QUERY_USER_EXPAND_ACCESS_Lvl } from "@/lib/const";
import {
  errorResponse,
  permissionHandler,
  successResponse,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { AccessLvlDelete, GetUserList } from "@/modules/cmsModule/services";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  // check access permission
  if (permissionHandler(session, "ACCESS_DELETE")) {
    return unauthorizeResponse();
  }

  const { id } = await request.json();

  // check require data
  if (!id) {
    return errorResponse("Access Lvl Id is required");
  }
  const getList = await GetUserList(
    `${CMS_QUERY_USER_EXPAND_ACCESS_Lvl}&$filter=isDelete eq false and accessLevellId eq ${id}&$top=1`
  );

  // remove
  // const removeData = await AccessLvlDelete(id);

  // check permission

  // if (removeData.error) {
  //   return errorResponse(removeData.error);
  // }
  return successResponse();
}
