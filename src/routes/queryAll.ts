import { Router, Request, Response, query } from 'express';
import TemperatureModel from '../models/dailyTemperatureByLocationModel';
import { QueryParams } from '../types/temperature';
import { getDefaultCacheData } from '../cache/default/getDefaultCache';
const router = Router();

// Route to fetch temperature data
router.get(
  '/',
  async (req: Request<{}, {}, {}, QueryParams>, res: Response) => {
    const { location } = req.query;
    try {
      //Check if cache data is available and also it has not expired
      const data = await getDefaultCacheData({
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
