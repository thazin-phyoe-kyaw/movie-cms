import { authOptions } from "@/lib/auth";
import {
  errorResponse,
  paginationQuery,
  permissionHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";

import { GETPlaylists } from "@/modules/displayServiceModule/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getQuery } from "@/lib/globalFunctions";

import { DISPLAY_PLAYLISTS } from "@/lib/apiConst";

import { GetTitleById } from "@/lib/generalApis";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (permissionHandler(session, "DISPLAY_PLAYLIST_READ")) {
    return unauthorizeResponse();
  }

  // get query
  const query = await getQuery(request.url);
  const pagination = paginationQuery(query);

  const playlists = await GETPlaylists(
    `${DISPLAY_PLAYLISTS}?$count=true&$expand=AdminPlaylistTitles&${pagination}`
  );

  if (playlists.error) {
    return errorResponse(playlists.error);
  }

  let titleIds = [];
  // get title data form Content service
  for (let playList of playlists.value) {
    for (let items of playList.adminPlaylistTitles) {
      titleIds = [...titleIds, items.titleId];
    }
  }

  titleIds = [...new Set(titleIds)];
  const titleObjs = await GetTitleById(titleIds);
  return NextResponse.json({
    ...playlists,
    value: playlists.value.map((playList) => {
      return {
        ...playList,
        adminPlaylistTitles: playList.adminPlaylistTitles.map((title) => {
          return (
            titleObjs.filter((titleObj) => titleObj.id == title.titleId)[0] ||
            title
          );
        }),
      };
    }),
  });
}
