import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  getQuery,
  paginationQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { GetUser } from "@/modules/cmsModule/services";
import { TitleGet } from "@/modules/contentServiceModule/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CMS_USER")) {
    return unauthorizeResponse();
  }

  const query = await getQuery(request.url);

  const pagination = paginationQuery(query);

  const getData = await GetUser(
    `?$select=name${
      query.id && query.id !== ""
        ? `&$filter= id eq ${query.id}`
        : "&$orderby=createdAt desc"
    }&${pagination}`
  );
  //   ?$select=name&$filter=id eq ${id}

  if (getData.error) {
    return errorResponse(getData.error);
  }

  return NextResponse.json(getData);
}
