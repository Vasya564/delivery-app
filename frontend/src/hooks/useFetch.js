import { useState, useEffect } from 'react';

const useFetch = (url, method = 'GET', body = null) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url, method, body]);

  return { data, isLoading, error };
};

export default useFetch;