import { FAQs_FAQs } from "@/lib/apiConst";
import { apiGetData } from "@/lib/apiQueryHandler";
import { authOptions } from "@/lib/auth";
import { FAQs_QUERY_TITLES } from "@/lib/const";
import {
  errorResponse,
  getQuery,
  paginationQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { QUERY_FAQ_CONST } from "@/lib/queryConst";
import { FAQGet, FAQtitleGet } from "@/modules/Setting/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (permissionHandler(session, "SETTING_READ")) {
    return unauthorizeResponse();
  }

  const query = await getQuery(request.url);

  // const pagination= paginationQuery(query)

  //     const getData= await FAQtitleGet(
  //         `${FAQs_QUERY_TITLES}&$orderBy=updatedAt desc &${pagination}`
  //     );

  //    console.log(getData)

  const getData = await apiGetData(query, QUERY_FAQ_CONST, FAQtitleGet);
console.log(getData)
  if (getData.error) {
    return errorResponse();
  }
  return NextResponse.json(getData);
}
