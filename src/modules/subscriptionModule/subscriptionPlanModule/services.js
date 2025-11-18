import { SUBSCRIPTION_SUBSCRIPTION_PLAN } from "@/lib/apiConst";
import { REQUEST_HEADER } from "@/lib/config";
import axios from "axios";

async function SubscriptionPlanGet(url) {
  console.log(`${SUBSCRIPTION_SUBSCRIPTION_PLAN}${url}`, "this is sub plan");
  return await axios
    .get(encodeURI(`${SUBSCRIPTION_SUBSCRIPTION_PLAN}${url}`), REQUEST_HEADER)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
async function SubscriptionPlanCreate(data) {
  return await axios
    .post(SUBSCRIPTION_SUBSCRIPTION_PLAN, data, REQUEST_HEADER)
    .then(() => {
      return { success: true };
    })
    .catch((e) => {
      console.log(e)
      return { error: "Client and server connection error" };
    });
}

async function SubscriptionPlanEdit(data, id) {
  return await axios
    .patch(
      encodeURI(`${SUBSCRIPTION_SUBSCRIPTION_PLAN}(${id})`),
      data,
      REQUEST_HEADER
    )
    .then(() => {
      return { success: true };
    })
    .catch((error) => {
      return { error: "Client and Server connection error" };
    });
}

export { SubscriptionPlanGet, SubscriptionPlanCreate, SubscriptionPlanEdit };
