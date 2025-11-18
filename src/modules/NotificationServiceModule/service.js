import { NOTIFICATION_NOTI, NOTIFICATION_TOPIC } from "@/lib/apiConst";
import { REQUEST_HEADER } from "@/lib/config";
import axios from "axios";


async function NotificationGet(url){
    //console.log(`${NOTIFICATION_NOTI}${url}`,"nnn")
    return await axios
    .get(encodeURI(`${NOTIFICATION_NOTI}${url}`),REQUEST_HEADER)
    .then(({data})=>{
        return data;
    })
    .catch(()=>{
        return { error: "Client and server connection error" };
    });
}

async function NotificationCreate(data){
   // console.log(`${NOTIFICATION_NOTI}`,data,"KKK")
    return await axios
    .post(NOTIFICATION_NOTI,data,REQUEST_HEADER)
    .then(()=>{
        return { success : true };
    })
    .catch((err)=>{
        return { error: "Client and server connection error" };
    });
}

async function TopicGet(url){
    return await axios
    .get(encodeURI(`${NOTIFICATION_TOPIC}${url}`),REQUEST_HEADER)
    .then(({data})=>{
        return data;
    })
    .catch(()=>{
        return { error: "Client and server connection error" };
    });
}

export {
    NotificationGet,
    NotificationCreate,
    TopicGet,
}
