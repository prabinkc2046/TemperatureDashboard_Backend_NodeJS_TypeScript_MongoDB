// // Update the cache for default (all) data
import { createCacheKey } from '../createCache';
import { fetchData } from '../../databaseQuery/fetchData';
import { transformDataForPlotting } from '../../transform/transformToPlotReadyData';
import { QueryParams } from '../../types/temperature';
import { cache } from '../cacheState';
import { FRESH_PERIOD } from '../../config/constants';

export const updateDefaultCache = async (queryParams?: QueryParams) => {
  const cacheKey = createCacheKey(queryParams);
  try {
    const filteredData = await fetchData();

    // Transform the data
    const transformedData = transformDataForPlotting(filteredData);

    // Store in cache with a timestamp
    cache.set(cacheKey, { data: transformedData, lastUpdate: Date.now() });
  } catch (error) {
    console.error('Error updating default cache:', error);
  }
};

// Initial population
updateDefaultCache();

setInterval(() => {
  updateDefaultCache();
}, FRESH_PERIOD);
