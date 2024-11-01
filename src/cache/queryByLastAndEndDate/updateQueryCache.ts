// Update the cache for query-based (filtered) data
import { createCacheKey } from '../createCache';
import { fetchData } from '../../databaseQuery/fetchTemperatureDataFilteredByLastNDays';
import { cache } from '../cacheState';
import { transformDataForPlotting } from '../../transform/transformToPlotReadyData';
import { QueryParams } from '../../types/temperature';

export const updateQueryCache = async (queryParams: QueryParams) => {
  const cacheKey = createCacheKey(queryParams);
  const { location, startDate, endDate } = queryParams;
  const filteredData = await fetchData(location, startDate, endDate);

  const transformedData = transformDataForPlotting(filteredData);
  cache.set(cacheKey, { data: transformedData, lastUpdate: Date.now() });
};
