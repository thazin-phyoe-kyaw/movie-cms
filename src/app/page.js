import Dashboardpage from "@/components/dashboard";
import { authOptions } from "@/lib/auth";
import { TOTAL_COUNT_QUERY } from "@/lib/const";
import { GetTotalcount } from "@/modules/dashboardpage/service";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // const data = await GetTotalcount(TOTAL_COUNT_QUERY);

  // const display = JSON.parse(data.value[0]?.displayObj);

  return "Hi";
  // <Dashboardpage permissions={session.permissions} dataObject={display} />
}
