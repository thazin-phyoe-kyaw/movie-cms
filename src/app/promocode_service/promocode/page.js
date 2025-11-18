import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Promocode from "./body";
import { PromocodeGet } from "@/modules/promocodeModule/services";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_PROMOCODE_CONST } from "@/lib/queryConst";

export default async function PromocodeList() {
  const { user } = await getServerSession(authOptions);
  const data = await odataQueryHandler(
    QUERY_PROMOCODE_CONST,
    QUERY_PROMOCODE_CONST.filter,
    QUERY_PROMOCODE_CONST.order,
    QUERY_PROMOCODE_CONST.fields,
    "normal",
    {
      top: 10,
      skip: 0,
    },
    PromocodeGet
  );

  return (
    <Promocode
      permissions={user.permissions}
      data={{
        total: data["@odata.count"] ? data["@odata.count"] : 0,

        value: data.value ? data.value : [],
      }}
    />
  );
}
