/**
 * Error utility functions for consistent error handling
 */

/**
 * Extract user-friendly error message from API response
 */
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.data?.errors?.[0]?.message) {
    return error.response.data.errors[0].message;
  }
  if (error.message) {
    return error.message;
  }
  return "An unexpected error occurred";
};

/**
 * Check if error is a network error
 */
export const isNetworkError = (error) => {
  return !error.response && error.message === "Network Error";
};

/**
 * Check if error is a timeout
 */
export const isTimeoutError = (error) => {
  return error.code === "ECONNABORTED";
};

/**
 * Check if error is client error (4xx)
 */
export const isClientError = (error) => {
  return error.response?.status >= 400 && error.response?.status < 500;
};

/**
 * Check if error is server error (5xx)
 */
export const isServerError = (error) => {
  return error.response?.status >= 500;
};

/**
 * Check if error is unauthorized (401)
 */
export const isUnauthorized = (error) => {
  return error.response?.status === 401;
};

/**
 * Check if error is forbidden (403)
 */
export const isForbidden = (error) => {
  return error.response?.status === 403;
};

/**
 * Format error for logging
 */
export const formatErrorForLogging = (error) => {
  return {
    message: getErrorMessage(error),
    status: error.response?.status,
    statusText: error.response?.statusText,
    data: error.response?.data,
    isNetworkError: isNetworkError(error),
    isTimeout: isTimeoutError(error),
  };
};

export default {
  getErrorMessage,
  isNetworkError,
  isTimeoutError,
  isClientError,
  isServerError,
  isUnauthorized,
  isForbidden,
  formatErrorForLogging,
};
