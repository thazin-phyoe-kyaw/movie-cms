import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Notification from "./body";
import { NotificationGet } from "@/modules/NotificationServiceModule/service";
import { NotificationHandler } from "@/lib/dataHandler";
import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { QUERY_NOTIFICATION_CONST } from "@/lib/queryConst";

export default async function NotificationList() {
  const { user } = await getServerSession(authOptions);
  const rawdata = await odataQueryHandler(
    QUERY_NOTIFICATION_CONST,
    QUERY_NOTIFICATION_CONST.filter,
    QUERY_NOTIFICATION_CONST.order,
    QUERY_NOTIFICATION_CONST.fields,
    "normal",
    {
      top: 10,
      skip: 0,
    },
    NotificationGet
  );
  const data = await NotificationHandler(rawdata);

  return (
    <Notification
      permissions={user.permissions}
      data={{
        total: data["@odata.count"] ? data["@odata.count"] : 0,
        value: data.value ? data.value : [],
      }}
    />
  );
}
