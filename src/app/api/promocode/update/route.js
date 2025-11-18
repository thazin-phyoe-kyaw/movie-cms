import { authOptions } from "@/lib/auth";
import { errorResponse, permissionHandler, successResponse } from "@/lib/globalFunctions";
import { PromocodeUpdate } from "@/modules/promocodeModule/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request){
    const session = await getServerSession(authOptions);

    if(permissionHandler(session,"PROMOCODE_SERVICE_UPDATE")){
        return NextResponse.json(
            {message: "Unauthorize request"},
            {status: 401}
        );
    }
    
const {id, name, description, startDate, endDate, useableCount} =await request.json();
if(!id ){
    return errorResponse("Require data");
}

const update = await PromocodeUpdate({
    name,
    description,
    startDate,
    endDate,
    useableCount,
},
id);
//console.log(id)
if(update.error){
    return errorResponse(update.error);
}
return successResponse();
}