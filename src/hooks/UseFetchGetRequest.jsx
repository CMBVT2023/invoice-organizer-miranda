import { useEffect, useState } from "react";

export function UseFetchGetRequest({ fetchURLBase, makeRequest, optionalQuery }) {
    const [ fetchData, setFetchData ] = useState(null);
    const [ errorOccurred, setErrorOccurred ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        const abortController = new AbortController;
        const abortSignal = abortController.signal;

        async function makeBasicGetRequest() {
            try {
                setIsLoading(true);
                let fetchURL = fetchURLBase;
                if (optionalQuery) {
                    fetchURL += `?q=${optionalQuery}`;
                }
                let response = await fetch(fetchURL, { method: 'GET', signal: abortSignal});
                if (!response.ok) throw new Error('Fetch request failed.');
                let data = await response.json();
                setFetchData(data);
                setErrorOccurred(false);
            } catch (error) {
                console.error(error);
                setErrorOccurred(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        makeBasicGetRequest();

        // return () => abortController.abort();
    }, [fetchURLBase, makeRequest, optionalQuery]);
    
    return {fetchData, errorOccurred, isLoading};
}