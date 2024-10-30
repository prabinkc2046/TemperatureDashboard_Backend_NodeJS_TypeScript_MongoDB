import { Router, Request, Response } from 'express';
import transformData from '../../utils/dataTransform';
import TemperatureModel from '../../model/temperature';
import { LocationDocument, TransformedData } from '../../types/temperature';
import { getCacheData } from '../../cache/temperatureCache';

const router = Router();

// Route to fetch temperature data
router.get('/', async (req: Request, res: Response) => {
  const now = Date.now();
  try {
    //Check if cache data is available and also it has not expired
    const data = await getCacheData();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching temperature data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
