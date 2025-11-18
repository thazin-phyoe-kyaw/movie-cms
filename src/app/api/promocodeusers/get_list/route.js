import { authOptions } from "@/lib/auth";
import { PROMOCODE_QUERY_PROMOCODE_USER } from "@/lib/const";
import { errorResponse, getQuery, paginationQuery, permissionHandler, queryFilterHandler, unauthorizeResponse } from "@/lib/globalFunctions";
import { FILTER_CONST_PROMOCODE_PROMOCODEUSER } from "@/lib/queryConst";
import { PromocodeUserGet } from "@/modules/promocodeModule/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET(request){
    const session = await getServerSession(authOptions);
    if(permissionHandler(session,"PROMOCODE_SERVICE_USER_READ")){
        return unauthorizeResponse();
    }

    const query = await getQuery(request.url);
    //console.log(query)
    const filter = queryFilterHandler(query,FILTER_CONST_PROMOCODE_PROMOCODEUSER)

    const pagination= paginationQuery(query);

    //get data
    const getPromoUserData = await PromocodeUserGet(`${PROMOCODE_QUERY_PROMOCODE_USER}${
        filter !== "" ? `&$filter=${filter}` : ""
      }&orderBy=updatedAt desc &${pagination}`);
   // console.log(getPromoUserData)
    if(getPromoUserData.error){
        return errorResponse();
    }
    //console.log(getPromoUserData);
    return NextResponse.json(getPromoUserData);
}