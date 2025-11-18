import { authOptions } from "@/lib/auth";
import { errorResponse, permissionHandler, successResponse, unauthorizeResponse } from "@/lib/globalFunctions";
import { EpinPackageCreate } from "@/modules/epinServiceModule/service";
import { getServerSession } from "next-auth";


export async function POST(request){
    const session = await getServerSession(authOptions);

    if(permissionHandler(session,"EPIN_EPIN_CREATE")){
        return unauthorizeResponse();
    }
    const {
        name,
        description,
        duration,
        expiredDuration,
        price,
    } = await request.json();

    if(!duration || !expiredDuration){
        return errorResponse("Required data!")
    }
    const saveData = await EpinPackageCreate({
        name,
        description,
        duration,
        expiredDuration,
        price,
    });

    if(saveData.error) {
        return errorResponse();
    }
    return successResponse();
}