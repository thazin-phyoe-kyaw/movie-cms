import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { authOptions } from "@/lib/auth";
import { QUERY_EPINS_CONST } from "@/lib/queryConst";
import { EpinGet } from "@/modules/epinServiceModule/service";
import { getServerSession } from "next-auth";
import React from "react";
import EpinListBody from "./body";

const EpinList = async ({ params }) => {
  const { user } = await getServerSession(authOptions);

  let filter = QUERY_EPINS_CONST.filter;
  let updateFilter = {
    ...filter,
    epinGenerationJobId: {
      ...filter.epinGenerationJobId,
      value: params.epinId,
    },
  };

  const data = await odataQueryHandler(
    QUERY_EPINS_CONST,
    updateFilter,
    QUERY_EPINS_CONST.order,
    QUERY_EPINS_CONST.fields,
    "normal",
    {
      top: 10,
      skip: 0,
    },
    EpinGet
  );

  return (
    <EpinListBody
      permissions={user.permissions}
      epinGetData={{
        total: data["@odata.count"] ? data["@odata.count"] : 0,
        value: data.value ? data.value : [],
      }}
      updateFilter={updateFilter}
    />
  );
};

export default EpinList;
