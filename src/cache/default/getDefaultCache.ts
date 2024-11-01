// GetDefaultCacheData
import { createCacheKey } from '../createCache';
import { cache, isUpdatingCache } from '../cacheState';
import { updateDefaultCache } from './updateDefaultCache';
import { QueryParams } from '../../types/temperature';

export const getDefaultCacheData = async (queryParams?: QueryParams) => {
  const cacheKey = createCacheKey(queryParams);
  const cacheEntry = cache.get(cacheKey);
  if (cacheEntry) {
    return cacheEntry.data;
  } else if (isUpdatingCache.default) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return cache.get(cacheKey)?.data;
  } else {
    isUpdatingCache.default = true;
    await updateDefaultCache(queryParams);
    isUpdatingCache.default = false;
    return cache.get(cacheKey)?.data;
  }
};
