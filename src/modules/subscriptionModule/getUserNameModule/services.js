import { CMS_USER } from "@/lib/apiConst";
import { REQUEST_HEADER } from "@/lib/config";
import axios from "axios";

async function UserGet(url) {
    return await axios
        .get(encodeURI(`${CMS_USER}${url}`), REQUEST_HEADER)
        .then(({ data }) => data)
        .catch(() => {
            return { error: "Client and server connection error" };
        });
}

export { UserGet };
