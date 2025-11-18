import { authOptions } from "@/lib/auth";
import { errorResponse, getCurrentDate, permissionHandler, successResponse, unauthorizeResponse } from "@/lib/globalFunctions";
import { FAQtitleCreate } from "@/modules/Setting/service";
import { getServerSession } from "next-auth";

export async function POST(request){
    const session = await getServerSession(authOptions);
    if(permissionHandler(session,"SETTING_READ")){
        return unauthorizeResponse();
    }
    const { titleEn, titleMm } = await request.json();

    if( !titleEn || !titleMm) {
        return errorResponse("Required data!")
    }

    const saveData = await FAQtitleCreate({
        titleEn,
        titleMm,
        createdAt: getCurrentDate(),
        createdBy: session.user?.id ? session.user.id : "",
    });

    if(saveData.error){
        return errorResponse();
    }

    return successResponse();

}