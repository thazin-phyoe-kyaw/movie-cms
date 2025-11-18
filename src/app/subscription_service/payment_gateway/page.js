import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { PaymentGatewayGet } from "@/modules/subscriptionModule/paymentGateWayModule/services";
import GateWayListBody from "./body";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_SUBSCRIPTION_PAYMENT_GATEWAY_CONST } from "@/lib/queryConst";

export default async function GateWaysList() {
  const { user } = await getServerSession(authOptions);

  const gateWaysList = await odataQueryHandler(
    QUERY_SUBSCRIPTION_PAYMENT_GATEWAY_CONST,
    QUERY_SUBSCRIPTION_PAYMENT_GATEWAY_CONST.filter,
    QUERY_SUBSCRIPTION_PAYMENT_GATEWAY_CONST.order,
    QUERY_SUBSCRIPTION_PAYMENT_GATEWAY_CONST.fields,
    "no_child",
    {
      top: 10,
      skip: 0,
    },
    PaymentGatewayGet
  );
  return (
    <GateWayListBody
      permissions={user.permissions}
      preData={{
        count: gateWaysList.error ? 0 : gateWaysList["@odata.count"] || 0,
        value: gateWaysList.error ? [] : gateWaysList || [],
      }}
      gateWay={gateWaysList.error ? [] : gateWaysList.value}
    />
  );
}
