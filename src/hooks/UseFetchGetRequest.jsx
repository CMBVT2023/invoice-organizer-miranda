import { useQuery } from "react-query";
import axios from "axios";
import { useCookies } from "react-cookie";

/**
 * @component Initializes a custom hooked used to make GET request to the backend.
 * @props {string} fetchURLBase - Base URL to access the backend.
 * @props {string} key - React Query key assigned to this request.
 * @returns {object & object & boolean} The response data received form the get request, an error object that contains any error generated by the post request, and an boolean to indicate if the request is loading.
 */
export function UseFetchGetRequest({ fetchURL, key }) {
  // Access the page's stored cookies
  const [ cookies ] = useCookies("account")
  
  //? Initializes the main query request and pulls the needed information from it.
  const {
    data: fetchData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [key],
    queryFn: makeGetRequest,
  });

  /**
   * @function Makes a get request to the specified URL and returns the response data received from it.
   * @returns {void}
   */
  async function makeGetRequest() {
    const requestHeaders = {
      "authorization": `${cookies.account}`
    }

    let response = await axios({
      method: "get",
      url: fetchURL,
      headers: requestHeaders
    });
    return response.data;
  }

  return { fetchData, errorOccurred: error?.message, isLoading };
}
