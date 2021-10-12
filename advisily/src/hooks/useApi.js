import { useState } from "react";

function useApi(apiFunc, handleResponse) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [failedToLoad, setFailedToLoad] = useState(false);
  const [data, setData] = useState([]);

  const request = async (...args) => {
    setLoading(true);
    try {
      let result = await apiFunc(...args);
      if (handleResponse !== undefined) result = handleResponse(result);
      setData(result);
    } catch (err) {
      setError(err);
      setFailedToLoad(false);
      console.error("Error in useApi: ", err, apiFunc);
    }
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    failedToLoad,
    request,
  };
}

export default useApi;
