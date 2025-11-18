import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import PlaylistBody from "./body";
import { GETPlaylists } from "@/modules/displayServiceModule/service";
import { DISPLAY_PLAYLISTS } from "@/lib/apiConst";

export default async function Playlist() {
  const { user } = await getServerSession(authOptions);

  const playlists = await GETPlaylists(
    `${DISPLAY_PLAYLISTS}?$count=true&$expand=AdminPlaylistTitles`
  );

  return (
    <PlaylistBody
      permissions={user.permissions}
      preData={
        playlists.error
          ? { count: 0, value: [] }
          : {
              count: playlists["@odata.count"] ? playlists["@odata.count"] : 0,
              value: playlists.value ? playlists.value : [],
            }
      }
    ></PlaylistBody>
  );
}
