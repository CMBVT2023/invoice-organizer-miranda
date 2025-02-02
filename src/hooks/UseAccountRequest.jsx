import axios from "axios";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";

/**
 * @component Custom hook for making a login or register user post request to the backend.
 * @param {string} endpointURL - Base endpoint url of the server.
 * @param {boolean} isNewUser - Denotes if the user needs to be registered.
 * @returns {boolean & Object & Function} A boolean denoting if the request is still pending, an object containing an errors that may have occurred, and a function to trigger the post request.
 */
export function UseAccountRequest({ endPoint, isNewUser }) {
  const [cookies, setCookies] = useCookies(["account"]);
  const { isLoading, error, mutateAsync } = useMutation({
    mutationFn: initializePostRequest,
    onSuccess: storeResponseData,
  });

  /**
   * @function Initializes the request headers and determines the appropriate request function to trigger.
   * @param {string} accountName - The name of the user's account.
   * @param {string} accountKey - The password for the user's account.
   * @returns {void}
   */
  function initializePostRequest(accountName, accountKey) {
    const requestHeaders = {
      accountName,
      accountKey,
    };

    if (isNewUser) {
      registerAccount(requestHeaders);
    } else {
      loginAccount(requestHeaders);
    }
  }

  /**
   * @function Triggers a post request to the login endpoint on the server.
   * @returns {Object}
   */
  async function loginAccount(headers) {
    const responseData = await axios({
      method: "get",
      url: `${endPoint}/login`,
      headers: headers,
    });
    return await responseData.json();
  }

  /**
   * @function Triggers a post request to the register endpoint on the server.
   * @returns {Object}
   */
  async function registerAccount(headers) {
    const responseData = await axios({
      method: "get",
      url: `${endPoint}/register`,
      headers: headers,
    });
    return await responseData.json();
  }

  /**
   * @function Stores the user session generated and retrieved from the backend.
   * @param {Object} data - Response data received from the backend.
   * @returns {void}
   */
  async function storeResponseData(data) {
    if (data.success) {
      setCookies("account", data.jwt);
    }
  }

  return { isLoading, error, mutateAsync };
}
