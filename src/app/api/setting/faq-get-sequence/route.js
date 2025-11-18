import { authOptions } from "@/lib/auth";
import { errorResponse, getQuery, paginationQuery, permissionHandler, queryFilterHandler, unauthorizeResponse } from "@/lib/globalFunctions";
import { FILTER_CONST_FAQS } from "@/lib/queryConst";
import { FAQGet } from "@/modules/Setting/service";
import { ContactsOutlined } from "@ant-design/icons";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request){
    const session = await getServerSession(authOptions);
    if(permissionHandler(session,"SETTING_READ")){
        return unauthorizeResponse();
    }
    const query = await getQuery(request.url);
    const filter = queryFilterHandler(query,FILTER_CONST_FAQS);
   // const pagination = paginationQuery(query);

    const faqsdt = await FAQGet(
        `?$count=true&$select=id,sequence,status${
            filter !== "" ? `&$filter=${filter}` : ""
        }`
    );

    console.log(faqsdt)
    if(faqsdt.error){
        return errorResponse(faqsdt.error);
    }
    return NextResponse.json(faqsdt);
}