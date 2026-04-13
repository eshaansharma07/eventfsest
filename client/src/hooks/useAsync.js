import { useEffect, useState } from 'react';

export const useAsync = (asyncFn, deps = [], initialState = null) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      try {
        setLoading(true);
        const response = await asyncFn();
        if (isMounted) {
          setData(response?.data ?? response);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    run();

    return () => {
      isMounted = false;
    };
  }, deps);

  return { data, loading, error, setData };
};
