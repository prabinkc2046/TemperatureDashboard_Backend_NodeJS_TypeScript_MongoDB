import { QueryParams } from '../../types/temperature';
import { createCacheKey } from '../createCache';
import { fetchData } from '../../databaseQuery/fetchData';
import { transformDataForPlotting } from '../../transform/transformToPlotReadyData';
import { cache } from '../cacheState';

export const updateLastNDaysQueryCache = async (queryParams: QueryParams) => {
  const cacheKey = createCacheKey(queryParams);
  const { location, startDate, endDate } = queryParams;

  const filteredByLastNdays = await fetchData(location, startDate, endDate);

  const transformedData = transformDataForPlotting(filteredByLastNdays);
  cache.set(cacheKey, { data: transformedData, lastUpdate: Date.now() });
};
