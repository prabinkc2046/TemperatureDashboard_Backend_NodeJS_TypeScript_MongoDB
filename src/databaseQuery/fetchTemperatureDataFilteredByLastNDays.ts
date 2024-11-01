import TemperatureModel from '../models/dailyTemperatureByLocationModel';

// import types
import { TemperatureDataFilteredByLastNdays } from '../types/temperature';

// Function to fetch filtered temperature data based on criteria
export const fetchData = async (
  location?: string,
  startDate?: string,
  endDate?: string
): Promise<TemperatureDataFilteredByLastNdays[]> => {
  const matchCriteria: any = {};

  if (location) {
    matchCriteria['location.suburb'] = location;
  }

  if (startDate && endDate) {
    matchCriteria['dailyTemperatures.date'] = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  return TemperatureModel.aggregate([
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
};
