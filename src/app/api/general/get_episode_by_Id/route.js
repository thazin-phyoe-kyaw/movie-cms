// import { authOptions } from "@/lib/auth";
// import { errorResponse, getQuery, paginationQuery, permissionHandler, unauthorizeResponse } from "@/lib/globalFunctions";
// import { EpisodeGet, EpisodeIdGet } from "@/modules/contentServiceModule/services";
// import { getServerSession } from "next-auth";
// import { NextResponse } from "next/server";

// export async function GET(request){
//     const session = await getServerSession(authOptions);

//     if(
//         permissionHandler(
//             session,
//             "PROMOCODE_SERVICE_EPISODE_ID_READ,PROMOCODE_SERVICE_TITLE_ID_READ,DISPLAY_ADS_ITEMS_READ,PROFILE_SERVICE_FAVOURITE_READ,PROFILE_SERVICE_LIKE_READ,PROFILE_SERVICE_DOWNLOAD_READ,PROFILE_SERVICE_USER_SHARE_READ"
//         )
//     ){
//         return unauthorizeResponse();
//     }
//     const query = await getQuery(request.url);

//     const pagination = paginationQuery(query);

//     const getEpisodeData = await EpisodeIdGet(
//          `?$count=true&$select=id,titleMm,titleEn
//         ${
//             query.name && query.name !== ""
//             ? `&$filter=startsWith(titleMm,'${query.name}')`
//             : "&$orderby=createdAt desc"

//         }&${pagination}`
//     );
//
//     if(getEpisodeData.error){
//         return errorResponse(getEpisodeData)
//     }

//     return NextResponse.json(getEpisodeData);
// }
