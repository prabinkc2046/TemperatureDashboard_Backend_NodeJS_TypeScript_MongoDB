// Main function to handle cache retrieval with freshness check
import { QueryParams } from '../../types/temperature';
import { createCacheKey } from '../createCache';
import { cache } from '../cacheState';
import { isUpdatingCache } from '../cacheState';
import { updateQueryCache } from './updateQueryCache';

export const getQueryCacheData = async (queryParams: QueryParams) => {
  const cacheKey = createCacheKey(queryParams);
  const cacheEntry = cache.get(cacheKey);

  if (cacheEntry) {
    return cacheEntry.data;
  }

  if (isUpdatingCache.query.get(cacheKey)) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return cache.get(cacheKey)?.data;
  } else {
    isUpdatingCache.query.set(cacheKey, true);

    await updateQueryCache(queryParams);
    isUpdatingCache.query.set(cacheKey, false);
    return cache.get(cacheKey)?.data;
  }
};
