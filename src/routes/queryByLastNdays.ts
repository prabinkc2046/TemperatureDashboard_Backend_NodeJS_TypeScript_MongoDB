import express, { Request, Response } from 'express';
const router = express.Router();

// import utils
import { calculateStartAndEndDate } from '../utils/calculateStartAndEndDate';

// import query function
import { getLastNDaysQueryCacheData } from '../cache/lastNdaysQueryCache/getLastNdaysQueryCacheData';

// Define query and response interfaces
interface LastDaysQueryParams {
  last: string;
  location?: string;
}

router.get(
  '/',
  async (req: Request<{}, {}, {}, LastDaysQueryParams>, res: Response) => {
    // Get query parameters
    const { last, location } = req.query;

    if (!last) {
      res.status(400).json({
        message: 'Missing required query parameter: last (e.g., last=7days)',
      });
      return;
    }

    try {
      const { startDate, endDate } = calculateStartAndEndDate(last);

      const data = await getLastNDaysQueryCacheData({
        location,
        startDate,
        endDate,
      });

      res.status(200).json({
        data,
      });
    } catch (error: any) {
      res.status(422).json({
        message: error.message,
      });
    }
  }
);

export default router;
