import { PROFILE_PROFILE } from "@/lib/apiConst";
import { authOptions } from "@/lib/auth";
import {
  EPIN_QUERY_EPIN,
  EPIN_QUERY_EPIN_USER,
  PROFILE_QUERY_PROFILE,
  PROFILE_Q_PROFILE,
} from "@/lib/const";
import {
  errorResponse,
  getQuery,
  paginationQuery,
  permissionHandler,
  queryFilterHandler,
  unauthorizeResponse,
} from "@/lib/globalFunctions";
import { EpinGet, EpinUserGet } from "@/modules/epinServiceModule/service";
import { ProfileGet } from "@/modules/profileServiceModule/services";
import { filter } from "lodash";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (permissionHandler(session, "EPIN_EPIN_READ")) {
    return unauthorizeResponse();
  }

  const query = await getQuery(request.url);
  console.log(query)

  //const filter = queryFilterHandler(query,)

  //const pagination = paginationQuery(query);
  const getEpinData = await EpinGet(
    `${EPIN_QUERY_EPIN}&$filter=serialNo eq '${query.serialNo}'`
  );
  // console.log(getEpinData, "this is epin data");

  if (getEpinData.value[0].status === "used") {
    // If EPIN data is marked as 'used', fetch EPIN_USER data
    const getEpinUserData = await EpinUserGet(`${EPIN_QUERY_EPIN_USER}`);
    // console.log(getEpinUserData.value,"jjj");

    if (getEpinUserData.error) {
      return errorResponse();
    }

    // Get the matching epinId from getEpinData
    const epinIdFromEpinData = getEpinData.value[0].id;

    // Find the matching data in getEpinUserData
    const matchingUserData = getEpinUserData.value.find(
      (userData) => userData.epinId === epinIdFromEpinData
    );

    // console.log(matchingUserData.userId, "lll");
    const userPData = await ProfileGet(`${PROFILE_Q_PROFILE}`);
    // console.log(userPData, "ppp");
    //  const userProfile = userPData.value.find(
    //   (p) => p.id ===
    //  )

    if (matchingUserData && matchingUserData.userId) {
      // Find the user data where userId matches
      const userProData = userPData.value.find(
        (p) => p.id === matchingUserData.userId
      );
      if (matchingUserData.error) {
        return errorResponse();
      }
      if (userProData) {
        return NextResponse.json({
          epinData: getEpinData.value,
          profileData: userProData, // Include profile data
        });
      }
    }
  } else {
    if (getEpinData.error) {
      return errorResponse();
    }

    // console.log(getEpinData, "mmm");
    // If getEpinData.status is not 'used', return EpinData
    return NextResponse.json({
      epinData: getEpinData.value,
      profileData: null,
    });
  }
}
