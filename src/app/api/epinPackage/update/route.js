import { authOptions } from "@/lib/auth";
import { errorResponse, permissionHandler, successResponse } from "@/lib/globalFunctions";
import { EpinPackageUpdate } from "@/modules/epinServiceModule/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request){
    const session = await getServerSession(authOptions);
    if(permissionHandler(session,"EPIN_PACKAGES_UPDATE,EPIN_PACKAGES_READ")){
        return NextResponse.json(
            {message: "Unauthorize request"},
            {status: 401}
        );
    }
    const{id, name, description }= await request.json();
    if(!id){
        return errorResponse("Require data");
    }
 
    const updateEpin = await EpinPackageUpdate({
        name,
        description,
    },id);
 //console.log(updateEpin)
    if(updateEpin.error){
        return errorResponse(updateEpin.error);
    }
    return successResponse();
}