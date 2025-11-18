import { authOptions } from "@/lib/auth";
import {
  getRoles,
  getRolesTilte,
} from "@/modules/contentServiceModule/services";
import { getServerSession } from "next-auth";
import RoleBody from "./body";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_CONTENT_ROLE_CONST } from "@/lib/queryConst";

export default async function Role() {
  const { user } = await getServerSession(authOptions);
  const roles = await odataQueryHandler(
    QUERY_CONTENT_ROLE_CONST,
    QUERY_CONTENT_ROLE_CONST.filter,
    QUERY_CONTENT_ROLE_CONST.order,
    QUERY_CONTENT_ROLE_CONST.fields,
    "no_child",
    { top: 10, skip: 0 },
    getRoles
  );
  const roleTitleID = await getRolesTilte(`?$select=roleId`);

  return (
    <RoleBody
      permissions={user.permissions}
      preData={
        roles.error
          ? { count: 0, value: [] }
          : {
              count: roles["@odata.count"] ? roles["@odata.count"] : 0,
              value: roles.value ? roles.value : [],
              roleTitleID,
            }
      }
    ></RoleBody>
  );
}
