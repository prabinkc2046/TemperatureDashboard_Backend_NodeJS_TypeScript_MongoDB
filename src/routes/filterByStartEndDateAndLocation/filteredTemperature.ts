import { Router, Request, Response } from 'express';
import TemperatureModel from '../../model/temperature';
import {
  TransformedData,
  QueryParamsFilteredDateRange,
} from '../../types/temperature';
import transformFilteredDateRangeTemperatureData from '../../transform/transformData';
import { getCacheData } from '../../cache/temperatureCache';

const router = Router();

// Route to fetch temperature data based on location and date range
router.get(
  '/',
  async (
    req: Request<{}, {}, {}, QueryParamsFilteredDateRange>,
    res: Response
  ) => {
    const { startDate, endDate, location } = req.query;

    try {
      const data: TransformedData[] | undefined = await getCacheData({
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
// Updating the transformData function to use the defined return type
