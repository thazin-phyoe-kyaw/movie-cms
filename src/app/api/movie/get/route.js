import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  paginationQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getQuery } from "@/lib/globalFunctions";
import { movieTitle } from "@/modules/contentServiceModule/services";
import { apiGetData } from "@/lib/apiQueryHandler";
import { QUERY_MOVIE_CONST } from "@/lib/queryConst";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "CONTENT_SERIE_READ")) {
    return unauthorizeResponse();
  }
  const query = await getQuery(request.url);
  const pagination = paginationQuery(query);

  // const movies = await movieTitle(
  //   `?$filter=Type eq 'movie' and Movie ne null and status eq true&$expand=Movie,GenreTitles($expand=Genre),TagTitles($expand=Tag),TitleCredit($expand=CreditRole($expand=Credit,Role);$orderby=CreditRole/sorting asc)`
  // );
  const movies = await apiGetData(query, QUERY_MOVIE_CONST, movieTitle);
  if (movies.error) {
    return errorResponse(movies.error);
  }

  return NextResponse.json(movies);
}
