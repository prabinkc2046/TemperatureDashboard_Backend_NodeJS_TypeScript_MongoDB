import { FRESH_PERIOD } from '../config/constants';
import TemperatureModel from '../model/temperature';
import { LocationDocument, TransformedData } from '../types/temperature';
import transformData from '../utils/dataTransform';

const cache = {
  data: null as TransformedData[] | null,
  lastUpdate: 0,
};

export const updateCache = async () => {
  const temperatures: LocationDocument[] = await TemperatureModel.find({});
  cache.data = transformData(temperatures);
  cache.lastUpdate = Date.now();
};

export const getCacheData = async () => {
  const now = Date.now();
  if (cache.data && now - cache.lastUpdate < FRESH_PERIOD) {
    return cache.data;
  }

  await updateCache();

  return cache.data;
};

// Initial population
updateCache();

setInterval(updateCache, FRESH_PERIOD);
