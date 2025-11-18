import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { SubscriptionPlanGet } from "@/modules/subscriptionModule/subscriptionPlanModule/services";
import { SUBSCRIPTION_QUERY_SUBSCRIPTION_PLAN } from "@/lib/const";
import PlanListBody from "./body";
import { PaymentGatewayGet } from "@/modules/subscriptionModule/paymentGateWayModule/services";
import { GetCMSUserById } from "@/lib/generalApis";
import { planDataHandler } from "@/lib/dataHandler";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_SUBSCRIPTION_PLAN_CONST } from "@/lib/queryConst";

export default async function PlansList({ params }) {
  const { user } = await getServerSession(authOptions);
  const gateWayList = await PaymentGatewayGet(
    `?$count=true&$select=id,platform,gateWayImage&$filter=active eq true`
  );

  let filter = QUERY_SUBSCRIPTION_PLAN_CONST.filter
  let updateFilter = {...filter , gateWays: { ...filter.gateWays, value:params.gatewayId} }
  

  const updatedPlanList = await odataQueryHandler(
    QUERY_SUBSCRIPTION_PLAN_CONST,
    updateFilter,
    QUERY_SUBSCRIPTION_PLAN_CONST.order,
    QUERY_SUBSCRIPTION_PLAN_CONST.fields,
    "normal",
    {
      top: 10,
      skip: 0,
    },
    SubscriptionPlanGet
  );
  console.log(
    updateFilter
  )

  let data = await SubscriptionPlanGet(
    `?$select=id,titleMm,titleEng,descriptionMm,descriptionEng,featuredImage,duration,gateways,costDisplay,currency,active,planId,termsAndConditionMm,termsAndConditionEng,updatedAt,updatedBy&$filter=gateways eq ${params.gatewayId}&$expand=PaymentGateway($select=platform)`
  );

  return (
    <PlanListBody
        permissions={user.permissions}
      preData={{
        // count: updatedPlanList.error ? 0 : updatedPlanList["@odata.count"] || 0,
        value: updatedPlanList.error ? [] : updatedPlanList || [],
      }}

    gateWayId={params.gatewayId}
        // gateWay={gateWayList.error ? [] : gateWayList.value}
      //   data={updatedPlanList.error ? [] : updatedPlanList || []}
    />
    // <div>hello</div>
  );
}
