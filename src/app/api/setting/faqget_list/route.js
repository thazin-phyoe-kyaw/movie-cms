import { authOptions } from "@/lib/auth";
import { FAQs_QUERY_FAQs, FAQs_QUERY_TITLES } from "@/lib/const";
import { errorResponse, getQuery, paginationQuery, permissionHandler, unauthorizeResponse } from "@/lib/globalFunctions";
import { FAQGet, FAQtitleGet } from "@/modules/Setting/service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request){
    const session = await getServerSession(authOptions);
    if(permissionHandler(session,"SETTING_READ")){
        return unauthorizeResponse();
    }

    const query= await getQuery(request.url);
    const pagination = paginationQuery(query);
    const getData = await FAQGet(
        `${FAQs_QUERY_FAQs}&$orderBy=updatedAt desc &${pagination}`
    );
    console.log(getData,"yyy")
    if(getData.error){
        return errorResponse();
    }
    return NextResponse.json(getData);
}