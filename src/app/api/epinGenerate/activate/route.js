import { authOptions } from "@/lib/auth";
import { errorResponse, permissionHandler, successResponse } from "@/lib/globalFunctions";
import { EpinActivate } from "@/modules/epinServiceModule/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(request){
    const session = await getServerSession(authOptions);
    if(permissionHandler(session,"EPIN_GENERATION_JOB_ACTIVATE")){
        return NextResponse.json(
            {message: "Unauthorize request"},
            {status: 401}
        );
    }

    const { batchNo, status, price, expiredDuration} = await request.json();
   //console.log(  batchNo, status, price, expiredDuration)
    if( !batchNo || ! status || !price || !expiredDuration ){
        return errorResponse("Required Data");
    }

  
    const activate = await EpinActivate({
        batchNo,
        status,
        price,
        expiredDuration,
    });

    //console.log(activate)
    if(activate.error){
       // console.log(activate.error)
        return errorResponse(activate.error);
    }
    return successResponse();
}