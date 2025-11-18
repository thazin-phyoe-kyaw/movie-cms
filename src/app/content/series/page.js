import { authOptions } from "@/lib/auth";
import {
  getCredits,
  getGenre,
  getRoles,
  getTag,
  movieTitle,
} from "@/modules/contentServiceModule/services";
import { getServerSession } from "next-auth";
import SeriesBody from "./body";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_SERIES_CONST } from "@/lib/queryConst";
export default async function Series() {
  const { user } = await getServerSession(authOptions);
  // const series = await movieTitle(
  //   `?$filter=Type eq 'series' and Series ne null and status eq true&$expand=Series,GenreTitles($expand=Genre),TagTitles($expand=Tag),TitleCredit($expand=CreditRole($expand=Credit,Role);$orderby=CreditRole/sorting asc)`
  // );
  const series = await odataQueryHandler(
    QUERY_SERIES_CONST,
    QUERY_SERIES_CONST.filter,
    QUERY_SERIES_CONST.order,
    QUERY_SERIES_CONST.fields,
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
    <SeriesBody
      ROLES={ROLES.value}
      GENRES={GENRES.value}
      TAGS={TAGS.value}
      CREDITS={CREDITS.value}
      permissions={user.permissions}
      preData={
        series?.error
          ? { count: 0, value: [] }
          : {
              count: series["@odata.count"] ? series["@odata.count"] : 0,
              value: series?.value ? series?.value : [],
            }
      }
    ></SeriesBody>
  );
}
