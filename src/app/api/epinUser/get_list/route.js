import { authOptions } from "@/lib/auth";
import { EPIN_QUERY_EPIN_USER } from "@/lib/const";
import { errorResponse, getQuery, permissionHandler, unauthorizeResponse } from "@/lib/globalFunctions";
import { EpinUserGet } from "@/modules/epinServiceModule/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET(request){
    const session = await getServerSession(authOptions);
    if(permissionHandler(session,"EPIN_EPIN_READ")){
        return unauthorizeResponse();
    }
    const query = await getQuery(request.url);

    const getEpinUserData = await EpinUserGet(
        `${EPIN_QUERY_EPIN_USER}`
    );

    if(getEpinUserData.console.error){
        return errorResponse();
    }
    return NextResponse.json(getEpinUserData);
}