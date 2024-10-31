import { FRESH_PERIOD } from '../config/constants';
import TemperatureModel from '../model/temperature';
import {
  LocationDocument,
  QueryParamsFilteredDateRange,
  TransformedData,
} from '../types/temperature';
import transformData from '../utils/dataTransform';
import transformFilteredDateRangeTemperatureData from '../transform/transformData';

const DEFAULT_CACHE_KEY = 'default';
const cache = new Map<
  string,
  { data: TransformedData[]; lastUpdate: number }
>();

const createCacheKey = (queryParams: QueryParamsFilteredDateRange): string => {
  const { startDate = '', endDate = '', location = '' } = queryParams;
  return startDate || endDate || location
    ? `${location}-${startDate}-${endDate}`
    : DEFAULT_CACHE_KEY;
};

// Update cache for a specific query or all data
export const updateCache = async (
  queryParams: QueryParamsFilteredDateRange = {}
) => {
  console.log('updating cache');
  const cacheKey = createCacheKey(queryParams);

  const isFilteredQuery =
    queryParams.location || queryParams.startDate || queryParams.endDate;

  let transformedData: TransformedData[];
  if (isFilteredQuery) {
    // Build the match criteria based on query parameters
    const matchCriteria: any = {};

    if (queryParams.location) {
      matchCriteria['location.suburb'] = queryParams.location;
    }

    if (queryParams.startDate) {
      matchCriteria['dailyTemperatures.date'] = {
        ...(matchCriteria['dailyTemperatures.date'] || {}),
        $gte: new Date(queryParams.startDate),
      };
    }

    if (queryParams.endDate) {
      matchCriteria['dailyTemperatures.date'] = {
        ...(matchCriteria['dailyTemperatures.date'] || {}),
        $lte: new Date(queryParams.endDate),
      };
    }

    const filteredData = await TemperatureModel.aggregate([
      { $unwind: '$dailyTemperatures' },
      { $match: matchCriteria },
      {
        $project: {
          _id: 0,
          location: '$location.suburb',
          date: '$dailyTemperatures.date',
          min: '$dailyTemperatures.temperature.min',
          max: '$dailyTemperatures.temperature.max',
        },
      },
    ]);

    transformedData = transformFilteredDateRangeTemperatureData(filteredData);
  } else {
    // Fetch and transform all data if no query is provided
    const allData: LocationDocument[] = await TemperatureModel.find({});
    transformedData = transformData(allData);
  }

  // Store in cache with a timestamp
  cache.set(cacheKey, { data: transformedData, lastUpdate: Date.now() });
};

// Function to retrieve cached data, refreshing if stale
export const getCacheData = async (
  queryParams: QueryParamsFilteredDateRange = {}
) => {
  const cacheKey = createCacheKey(queryParams);
  const cacheEntry = cache.get(cacheKey);
  const now = Date.now();
  // Check if the cache entry exists and is still fresh
  if (cacheEntry && now - cacheEntry.lastUpdate < FRESH_PERIOD) {
    console.log('serving from cache');
    return cacheEntry.data;
  }
  // Update cache if stale or missing
  await updateCache(queryParams);
  return cache.get(cacheKey)?.data;
};

// Initial population
updateCache();

setInterval(() => {
  updateCache();
}, FRESH_PERIOD);
