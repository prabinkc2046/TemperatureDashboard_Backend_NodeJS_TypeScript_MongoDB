import { QueryParams } from '../../types/temperature';
import { createCacheKey } from '../createCache';
import { cache } from '../cacheState';
import { isUpdatingCache } from '../cacheState';
import { updateLastNDaysQueryCache } from './updateLastNdaysQueryCache';

export const getLastNDaysQueryCacheData = async (queryParams: QueryParams) => {
  const cacheKey = createCacheKey(queryParams);
  const cacheEntry = cache.get(cacheKey);
  if (cacheEntry) {
    return cacheEntry.data;
  }

  if (isUpdatingCache.lastNdays.get(cacheKey)) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return cache.get(cacheKey)?.data;
  } else {
    isUpdatingCache.lastNdays.set(cacheKey, true);
    await updateLastNDaysQueryCache(queryParams);
    isUpdatingCache.lastNdays.set(cacheKey, false);
    return cache.get(cacheKey)?.data;
  }
};
