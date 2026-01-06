import { useState, useCallback } from "react";
import api from "../services/api";

/**
 * Custom hook for mutations (POST, PUT, DELETE, PATCH)
 * @param {string} url - API endpoint URL
 * @param {string} method - HTTP method
 * @param {object} options - Configuration options
 * @returns {object} { execute, loading, error, data, reset }
 */
export const useMutation = (url, method = "POST", options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { headers = {}, onSuccess, onError } = options;

  const execute = useCallback(
    async (payload = {}, customUrl = null) => {
      try {
        setLoading(true);
        setError(null);

        const response = await api({
          url: customUrl || url,
          method,
          headers,
          data: payload,
        });

        setData(response.data);
        onSuccess?.(response.data);
        return response.data;
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "An error occurred";
        const errorObj = {
          message: errorMessage,
          status: err.response?.status,
          data: err.response?.data,
        };
        setError(errorObj);
        onError?.(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, method, headers, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { execute, loading, error, data, reset };
};

export default useMutation;
