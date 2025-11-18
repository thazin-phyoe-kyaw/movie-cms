import { SUBSCRIPTION_PAYMENT_GATEWAY } from "@/lib/apiConst";
import { SUBSCRIPTION_SERVICE_API, REQUEST_HEADER } from "@/lib/config";
import axios from "axios";

async function PaymentGatewayGet(url) {
  return await axios
    .get(
      encodeURI(
        `${SUBSCRIPTION_PAYMENT_GATEWAY}${url}&$filter=source eq 'movie'`
      ),
      REQUEST_HEADER
    )
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return { error: "Client and server connection error" };
    });
}
// async function PaymentGatewayCreate(data) {
//   console.log(data)
//   return await axios
//     .post(SUBSCRIPTION_PAYMENT_GATEWAY, data, REQUEST_HEADER)
//     .then(() => {
//       return { success: true };
//     })
//     .catch(() => {
//       return { error: "Client and server connection error" };
//     });
// }
async function PaymentGatewayEdit(data, id) {
  return await axios
    .patch(
      encodeURI(`${SUBSCRIPTION_PAYMENT_GATEWAY}(${id})`),
      data,
      REQUEST_HEADER
    )
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: "Client and Server connection error" };
    });
}

export { PaymentGatewayGet, PaymentGatewayEdit };
