import { authOptions } from "@/lib/auth";
import {
  getCredits,
  getRolesTilte,
} from "@/modules/contentServiceModule/services";
import { getServerSession } from "next-auth";
import CreditBody from "./body";
import { QUERY_CONTENT_CREDIT_CONST } from "@/lib/queryConst";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
export default async function Role() {
  const { user } = await getServerSession(authOptions);

  const credits = await odataQueryHandler(
    QUERY_CONTENT_CREDIT_CONST,
    QUERY_CONTENT_CREDIT_CONST.filter,
    QUERY_CONTENT_CREDIT_CONST.order,
    QUERY_CONTENT_CREDIT_CONST.fields,
    "no_child",
    { top: 10, skip: 0 },
    getCredits
  );

  const creditTitleID = await getRolesTilte(`?$select=creditId`);

  return (
    <CreditBody
      permissions={user.permissions}
      preData={
        credits.error
          ? { count: 0, value: [] }
          : {
              count: credits["@odata.count"] ? credits["@odata.count"] : 0,
              value: credits.value ? credits.value : [],
              creditTitleID,
            }
      }
    ></CreditBody>
  );
}
