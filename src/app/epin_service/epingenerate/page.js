import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { EpinGenerateGet } from "@/modules/epinServiceModule/service";
import EpinGenerate from "./body";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_EPIN_GENERATION_JOB_CONST } from "@/lib/queryConst";

export default async function LayoutHeader() {
  const { user } = await getServerSession(authOptions);
  const data = await odataQueryHandler(
    QUERY_EPIN_GENERATION_JOB_CONST,
    QUERY_EPIN_GENERATION_JOB_CONST.filter,
    QUERY_EPIN_GENERATION_JOB_CONST.order,
    QUERY_EPIN_GENERATION_JOB_CONST.fields,
    "normal",
    {
      top: 10,
      skip: 0,
    },
    EpinGenerateGet
  );

  return (
    <EpinGenerate
      permissions={user.permissions}
      epinGenerData={{
        total: data["@odata.count"] ? data["@odata.count"] : 0,
        value: data.value ? data.value : [],
      }}
    />
  );
}
