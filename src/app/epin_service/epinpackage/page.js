import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import EpinPackage from "./body";
import { EpinPackageGet } from "@/modules/epinServiceModule/service";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_EPIN_PACKAGE_CONST } from "@/lib/queryConst";

export default async function EpinPackageList() {
  const { user } = await getServerSession(authOptions);

  const data = await odataQueryHandler(
    QUERY_EPIN_PACKAGE_CONST,
    QUERY_EPIN_PACKAGE_CONST.filter,
    QUERY_EPIN_PACKAGE_CONST.order,
    QUERY_EPIN_PACKAGE_CONST.fields,
    "no_child",
    {
      top: 10,
      skip: 0,
    },
    EpinPackageGet
  );

  return (
    <EpinPackage
      permissions={user.permissions}
      data={{
        total: data["@odata.count"] ? data["@odata.count"] : 0,
        value: data.value ? data.value : [],
      }}
    />
  );
}
