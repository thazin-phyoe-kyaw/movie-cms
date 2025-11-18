import { authOptions } from "@/lib/auth";
import {
  getGenre,
  getGenreTitle,
} from "@/modules/contentServiceModule/services";
import { getServerSession } from "next-auth";

import GenreBody from "./body";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_CONTENT_GENRE_CONST } from "@/lib/queryConst";

export default async function Role() {
  const { user } = await getServerSession(authOptions);

  const genres = await odataQueryHandler(
    QUERY_CONTENT_GENRE_CONST,
    QUERY_CONTENT_GENRE_CONST.filter,
    QUERY_CONTENT_GENRE_CONST.order,
    QUERY_CONTENT_GENRE_CONST.fields,
    "no_child",
    {
      top: 10,
      skip: 0,
    },
    getGenre
  );

  const genreTitleID = await getGenreTitle(`?$select=genreId`);

  return (
    <GenreBody
      permissions={user.permissions}
      preData={
        genres.error
          ? { count: 0, value: [] }
          : {
              count: genres["@odata.count"] ? genres["@odata.count"] : 0,
              value: genres.value ? genres.value : [],
              genreTitleID,
            }
      }
    ></GenreBody>
  );
}
