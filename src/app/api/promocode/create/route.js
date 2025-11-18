import { authOptions } from "@/lib/auth";
import { errorResponse, permissionHandler, successResponse, unauthorizeResponse } from "@/lib/globalFunctions";
import { PromocodeCreate } from "@/modules/promocodeModule/services";
import { getServerSession } from "next-auth";

export async function POST(request){
    const session = await getServerSession(authOptions);

    if(permissionHandler(session,"PROMOCODE_SERVICE_CREATE,PROMOCODE_SERVICE_READ")){
        return unauthorizeResponse();
    }

    const { 
        titleId, 
        episodeId, 
        name, 
        description,  
        startDate, 
        endDate,
        useableCount,
        code, 
    } = await request.json();
//console.log(titleId)
    if( !startDate || !endDate || !code){
        return errorResponse("Require data!");
    }
    // console.log( {titleId, 
    //     episodeId, 
    //     name, 
    //     description,
    //     startDate, 
    //     endDate,  
    //     code,
    //     useableCount});

    const saveData =await PromocodeCreate({ 
        titleId, 
        episodeId, 
        name, 
        description,
        startDate, 
        endDate,  
        code,
        useableCount
    });
   //console.log(saveData)
    if(saveData.error){
        return errorResponse();
    }
    return successResponse();
}