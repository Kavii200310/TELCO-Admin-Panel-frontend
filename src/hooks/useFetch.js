import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

/**
 * Custom hook for fetching data with loading and error states
 * @param {string} url - API endpoint URL
 * @param {object} options - Configuration options
 * @returns {object} { data, loading, error, refetch }
 */
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    method = "GET",
    headers = {},
    params = {},
    shouldFetch = true,
    onSuccess,
    onError,
    dependencies = [],
  } = options;

  const fetchData = useCallback(async () => {
    if (!url || !shouldFetch) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await api({
        url,
        method,
        headers,
        params,
      });

      setData(response.data);
      onSuccess?.(response.data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occurred while fetching data";
      setError({
        message: errorMessage,
        status: err.response?.status,
        data: err.response?.data,
      });
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [url, method, headers, params, shouldFetch, onSuccess, onError]);

  // Fetch data on mount and when dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  // Refetch function to manually trigger data fetching
  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

export default useFetch;
