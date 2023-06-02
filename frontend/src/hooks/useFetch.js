import { useState } from 'react';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, method = 'GET', body = null) => {
    setIsLoading(true);
    setError(null);

    try {
      const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null,
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error('Request failed.');
      }

      const responseData = await response.json();
      setData(responseData);
      setIsLoading(false);

      return { response, data: responseData };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);

      return { error: err };
    }
  };

  return { data, isLoading, error, fetchData };
};

export default useFetch;