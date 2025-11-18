import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { GETSliderData } from "@/modules/displayServiceModule/service";
import SliderItemBody from "./body";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_DISPLAY_AD_SLIDER_CONST } from "@/lib/queryConst";
export default async function ADList() {
  const { user } = await getServerSession(authOptions);
  const sliderData = await odataQueryHandler(
    QUERY_DISPLAY_AD_SLIDER_CONST,
    QUERY_DISPLAY_AD_SLIDER_CONST.filter,
    QUERY_DISPLAY_AD_SLIDER_CONST.order,
    QUERY_DISPLAY_AD_SLIDER_CONST.fields,
    "no_child",
    { top: 10, skip: 0 },
    GETSliderData
  );
  return (
    <SliderItemBody
      permissions={user.permissions}
      preData={
        sliderData.error
          ? { count: 0, value: [] }
          : {
              count: sliderData["@odata.count"]
                ? sliderData["@odata.count"]
                : 0,
              value: sliderData.value ? sliderData.value : [],
            }
      }
    ></SliderItemBody>
  );
}
