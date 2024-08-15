import axios, { Method } from "axios";
import { envVars } from "./enviromentVars";
import Cookies from "universal-cookie";
import { authCookiePath } from "@/hooks/useAuth";
import { errorManager } from "@/components/Utilities/ErrorManager";

export default async function fetchData(
  endpoint: string,
  method: Method = "GET",
  axiosData = {},
  params = {},
  headers = {},
  isAuthorized = false,
  noCache: boolean | undefined = true
) {
  try {
    const cookies = new Cookies();
    const token = cookies.get(authCookiePath);

    const res = await axios.request({
      url:
        `${envVars.NEXT_PUBLIC_GAP_INDEXER_URL}${endpoint}` +
        (noCache ? `${endpoint.includes("?") ? "&" : "?"}noCache=true` : ""),
      method,
      headers: {
        Authorization: isAuthorized ? token || undefined : undefined,
        ...headers,
      },
      data: axiosData,
      timeout: 60000,
      params,
    });
    let resData = res.data;
    let pageInfo = res.data.pageInfo || null;
    return [resData, null, pageInfo];
  } catch (err: any) {
    errorManager(`Error in fetch data ${endpoint}`, err);
    let error = "";
    if (!err.response) {
      error = "No server response";
    } else if (err.response.status >= 500) {
      error = "Internal server error";
    } else {
      error = err.response.data.message || err.message;
    }
    return [null, error];
  }
}
