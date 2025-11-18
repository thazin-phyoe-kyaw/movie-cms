import { authOptions } from "@/lib/auth";
import {
  getCredits,
  getGenre,
  getRoles,
  getTag,
  movieTitle,
} from "@/modules/contentServiceModule/services";
import { getServerSession } from "next-auth";
import MovieBody from "./body";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_MOVIE_CONST } from "@/lib/queryConst";

export default async function Role() {
  const { user } = await getServerSession(authOptions);
  const movies = await odataQueryHandler(
    QUERY_MOVIE_CONST,
    QUERY_MOVIE_CONST.filter,
    QUERY_MOVIE_CONST.order,
    QUERY_MOVIE_CONST.fields,
    "normal",
    {
      top: 10,
      skip: 0,
    },
    movieTitle
  );

  const GENRES = await getGenre(`?$count=true&$select=id,nameMm`);
  const TAGS = await getTag(`?$count=true&$select=id,nameMm`);
  const CREDITS = await getCredits(`?$count=true&$select=id,nameMm`);
  const ROLES = await getRoles(`?$count=true&$select=id,nameMm`);

  return (
    <MovieBody
      ROLES={ROLES.value}
      permissions={user.permissions}
      GENRES={GENRES.value}
      TAGS={TAGS.value}
      CREDITS={CREDITS.value}
      preData={
        movies.error
          ? { count: 0, value: [] }
          : {
              count: movies["@odata.count"] ? movies["@odata.count"] : 0,
              value: movies.value ? movies.value : [],
            }
      }
    ></MovieBody>
  );
}
