import { authOptions } from "@/lib/auth";
import { errorResponse, permissionHandler, successResponse, unauthorizeResponse } from "@/lib/globalFunctions";
import { NotificationCreate } from "@/modules/NotificationServiceModule/service";
import { getServerSession } from "next-auth";

export async function POST(request){
    const session = await getServerSession(authOptions);
    if(permissionHandler(session,"NOTIFICATION_READ")){
        return unauthorizeResponse();
    }

    const{
        name,
        notiTitle,
        notiDescription,
        image,
        referencedId,
        referenceUrl,
        referenceType,
        sendDate,
        topicId,
        
    } = await request.json();

        // console.log( {name,
        //     notiTitle,
        //     notiDescription,
        //     image,
        //     referencedId,
        //     referenceUrl,
        //     referenceType,
        //     sendDate,
        //     topicId,
        //     },"mmm")

    if( !name || !notiTitle || !notiDescription  || !topicId || ! referenceType){
        return errorResponse("Require data!");
    }

    const saveNotiData = await NotificationCreate({
        name,
        notiTitle,
        notiDescription,
        image: image ? image : null,
        referencedId: referencedId ? referencedId : null,
        referenceUrl: referenceUrl ? referenceUrl : null,
        referenceType,
        sendDate: sendDate ? sendDate : null,
        topicId,
    });

   //console.log(saveNotiData,"hihi")

    if(saveNotiData.error){
        return errorResponse();
    }
    return successResponse();
}