import { authOptions } from "@/lib/auth";
import { errorResponse, getCurrentDate, permissionHandler, successResponse, unauthorizeResponse } from "@/lib/globalFunctions";
import { FAQtitleDelete } from "@/modules/Setting/service";
import { getServerSession } from "next-auth";


export async function POST(request){
    const session = await getServerSession(authOptions);

    if(permissionHandler(session,"SETTING_READ,SETTING_DELETE")){
        return unauthorizeResponse();
    }

    const { id } = await request.json();
    //console.log(id,"mmm")
    if(!id){
        return errorResponse("FAQ title is not found!");
    }
   
    const deleteData= await FAQtitleDelete(
        {
            updatedAt: getCurrentDate(),
            deletedAt: getCurrentDate(),
            updatedBy: session.user?.id ? session.user.id : "",
        },
        id
    );
   // console.log(deleteData,"kkk")
    if (deleteData.error) {
        return errorResponse(deleteData.error);
      }
    
      return successResponse();

}