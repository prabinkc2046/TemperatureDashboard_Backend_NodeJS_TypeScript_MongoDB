import { Router, Request, Response } from 'express';
import TemperatureModel from '../models/dailyTemperatureByLocationModel';
import { QueryParams } from '../types/temperature';
import { getQueryCacheData } from '../cache/queryByLastAndEndDate/getQueryCachedData';
const router = Router();

// Route to fetch temperature data based on location and date range
router.get(
  '/',
  async (req: Request<{}, {}, {}, QueryParams>, res: Response) => {
    const { startDate, endDate, location } = req.query;

    try {
      const data = await getQueryCacheData({
        startDate,
        endDate,
        location,
      });
      if (data) {
        res.status(200).json(data);
        return;
      }

      res.status(404).json({ message: 'No data found' });
    } catch (error) {
      console.error('Error fetching temperature data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

export default router;
