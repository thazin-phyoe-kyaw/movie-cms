import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { authOptions } from "@/lib/auth";
import { QUERY_EPIN_GENERATION_JOB_CONST } from "@/lib/queryConst";
import { EpinGenerateGet } from "@/modules/epinServiceModule/service";
import { getServerSession } from "next-auth";
import React from "react";

const DailyEpinList = async () => {
  const { user } = await getServerSession(authOptions);

  let filter = QUERY_EPIN_GENERATION_JOB_CONST.filter;
  let updateFilter = {
    ...filter,
    name: {
      ...filter.name,
      value: "Mahar Epin Weekly",
    },
  };

  const data = await odataQueryHandler(
    QUERY_EPIN_GENERATION_JOB_CONST,
    updateFilter,
    QUERY_EPIN_GENERATION_JOB_CONST.order,
    QUERY_EPIN_GENERATION_JOB_CONST.fields,
    "normal",
    {
      top: 10,
      skip: 0,
    },
    EpinGenerateGet
  );
  console.log(data);
  return <div>DailyEpinList</div>;
};

export default DailyEpinList;
