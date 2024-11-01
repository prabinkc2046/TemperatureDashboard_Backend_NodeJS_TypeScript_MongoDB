// Generate a cache key based on query params

import { DEFAULT_CACHE_KEY } from '../config/constants';
import { QueryParams } from '../types/temperature';

export const createCacheKey = (queryParams?: QueryParams) => {
  if (!queryParams) return DEFAULT_CACHE_KEY;
  const { startDate = '', endDate = '', location = '' } = queryParams;
  return `${location}-${startDate}-${endDate}` || DEFAULT_CACHE_KEY;
};
