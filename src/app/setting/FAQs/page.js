import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Setting from "./body";
import { FAQtitleGet } from "@/modules/Setting/service";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_FAQ_CONST } from "@/lib/queryConst";

export default async function FAQlist() {
  const { user } = await getServerSession(authOptions);
  const data = await odataQueryHandler(
    QUERY_FAQ_CONST,
    QUERY_FAQ_CONST.filter,
    QUERY_FAQ_CONST.order,
    QUERY_FAQ_CONST.fields,
    "normal",
    {
      top: 10,
      skip: 0,
    },
    FAQtitleGet
  );

  return (
    <Setting
      permissions={user.permissions}
      data={{
        total: data["@odata.count"] ? data["@odata.count"] : 0,
        value: data.value ? data.value : [],
      }}
    />
  );
}
