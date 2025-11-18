import { authOptions } from "@/lib/auth";
import { errorResponse, getCurrentDate, permissionHandler, successResponse, unauthorizeResponse } from "@/lib/globalFunctions";
import { EpinGenerateCreate } from "@/modules/epinServiceModule/service";
import { getServerSession } from "next-auth";

export async function POST(request){
    const session = await getServerSession(authOptions);
    if(permissionHandler(session,"EPIN_EPIN_READ,PROMOCODE_SERVICE_TITLE_ID_READ,DISPLAY_ADS_ITEMS_READ,PROFILE_SERVICE_FAVOURITE_READ,PROFILE_SERVICE_LIKE_READ,PROFILE_SERVICE_DOWNLOAD_READ,PROFILE_SERVICE_USER_SHARE_READ")){
        return unauthorizeResponse();
    }

    const {
        prefix,
        batchNo,
        count,
        lot,
        planId,
        description,
        expireDate
    } = await request.json();

    if( !prefix || !batchNo  || !count || !lot || !planId || !expireDate){
        return errorResponse("Require data!");
    }
    const saveEpinData = await EpinGenerateCreate({
        prefix,
        batchNo,
        count,
        lot,
        planId,
        description,
        expireDate
    });
    if(saveEpinData.error){
        return errorResponse();
    }
    return successResponse();
}