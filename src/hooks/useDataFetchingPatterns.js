/**
 * Common patterns and utilities for data fetching
 */
import { useState, useCallback } from "react";

/**
 * Combine multiple fetch requests
 * Useful for loading related data in parallel
 */
export const useMultipleFetch = (fetchers = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const results = await Promise.all(fetchers);
      setData(results);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchers]);

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
};

/**
 * Debounced fetching for search/filter inputs
 * Prevents excessive API calls while user is typing
 */
export const useDebouncedFetch = (
  fetcher,
  delay = 300,
  shouldFetch = true
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (!shouldFetch) return;

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const result = await fetcher();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [fetcher, delay, shouldFetch]);

  return { data, loading, error };
};

/**
 * Paginated data fetching
 * Handles pagination state and loading more items
 */
export const usePaginatedFetch = (fetchFn, initialPage = 1, pageSize = 10) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const loadPage = useCallback(
    async (pageNum) => {
      try {
        setLoading(true);
        const result = await fetchFn(pageNum, pageSize);
        setData(result.items);
        setHasMore(result.hasMore);
        setPage(pageNum);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [fetchFn, pageSize]
  );

  const loadMore = useCallback(() => {
    loadPage(page + 1);
  }, [loadPage, page]);

  React.useEffect(() => {
    loadPage(initialPage);
  }, [loadPage, initialPage]);

  return { data, page, loading, hasMore, error, loadMore, loadPage };
};

/**
 * Infinite scroll loading
 * Appends new items to existing data
 */
export const useInfiniteScroll = (fetchFn, pageSize = 10) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const result = await fetchFn(page, pageSize);
      setData((prev) => [...prev, ...result.items]);
      setHasMore(result.hasMore);
      setPage((prev) => prev + 1);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, page, pageSize, hasMore, loading]);

  React.useEffect(() => {
    loadMore();
  }, []);

  return { data, loading, hasMore, error, loadMore };
};

/**
 * Cache fetched data
 * Prevents refetching the same data multiple times
 */
const dataCache = new Map();

export const useCachedFetch = (key, fetcher, ttl = 5 * 60 * 1000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    const now = Date.now();
    const cached = dataCache.get(key);

    if (cached && now - cached.timestamp < ttl) {
      setData(cached.data);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const result = await fetcher();
      dataCache.set(key, { data: result, timestamp: now });
      setData(result);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [key, fetcher, ttl]);

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  const invalidateCache = useCallback(() => {
    dataCache.delete(key);
  }, [key]);

  return { data, loading, error, refetch: fetch, invalidateCache };
};

export default {
  useMultipleFetch,
  useDebouncedFetch,
  usePaginatedFetch,
  useInfiniteScroll,
  useCachedFetch,
};
