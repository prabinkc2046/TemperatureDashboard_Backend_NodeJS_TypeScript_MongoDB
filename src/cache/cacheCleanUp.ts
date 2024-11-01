import { cache } from './cacheState';
import { FRESH_PERIOD } from '../config/constants';
import { CACHE_CLEANER_INTERVAL } from '../config/constants';

const cleanedUpExpiredCacheEntries = () => {
  const now = Date.now();
  for (const [key, value] of cache) {
    if (now - value.lastUpdate > FRESH_PERIOD) {
      console.log('deleting key', key);
      console.log('deleted data', cache.get(key));
      cache.delete(key);
    }
  }
};

// Schedule the cleanup function to run every 5 minutes (300000 ms)
setInterval(cleanedUpExpiredCacheEntries, CACHE_CLEANER_INTERVAL);
