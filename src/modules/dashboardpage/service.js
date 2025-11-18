import { TOTAL_COUNT } from "@/lib/apiConst";
import { REQUEST_HEADER } from "@/lib/config";
import axios from "axios";

async function GetTotalcount(url) {
  console.log(`${TOTAL_COUNT}${url}`);
  return await axios

    .get(encodeURI(`${TOTAL_COUNT}${url}`), REQUEST_HEADER)
    .then((res) => {
      console.log(res.data, "RES");
      return res.data;
    })
    .catch((error) => {
      // console.log(error);
      return { error: "Client and server connection error" };
    });
  try {
    const response = await axios.get(
      encodeURI(`${TOTAL_COUNT}${url}`),
      REQUEST_HEADER
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching total count:", error);
    return { error: "Client and server connection error" };
  }
}

export { GetTotalcount };
