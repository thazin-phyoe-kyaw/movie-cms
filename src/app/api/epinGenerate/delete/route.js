import { authOptions } from "@/lib/auth";
import { errorResponse, getCurrentDate, permissionHandler, successResponse, unauthorizeResponse } from "@/lib/globalFunctions";
import { EpinGenerateDelete } from "@/modules/epinServiceModule/service";
import { getServerSession } from "next-auth";


export async function POST(request){
    const session = await getServerSession(authOptions);


if (permissionHandler(session, "EPIN_GENERATION_JOB_DELETE")){
    return unauthorizeResponse();
}
const { id } = await request.json();
//console.log(id)
if(!id ){
    return errorResponse("Epin Generate Job is not found");
}

const deleteResult = await EpinGenerateDelete(
    {
        updatedAt: getCurrentDate(),
        updatedBy: session.user?.id ? session.user.id : "",
    },
    id);
    //console.log(deleteResult)
    if(deleteResult.error){
        return errorResponse(deleteResult.error);
    }
    return successResponse();
}