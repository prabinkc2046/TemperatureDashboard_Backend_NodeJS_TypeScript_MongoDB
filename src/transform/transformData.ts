import {
  TransformedData,
  FilteredDateRangeDailyTemperatureData,
} from '../types/temperature';

const transformFilteredDateRangeTemperatureData = (
  rawData: FilteredDateRangeDailyTemperatureData[]
): TransformedData[] => {
  const transformed: {
    [location: string]: {
      [date: string]: {
        location: string;
        date: string;
        min: number[];
        max: number[];
      };
    };
  } = {};

  rawData.forEach((item: FilteredDateRangeDailyTemperatureData) => {
    const date = item.date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    const location = item.location;

    if (!transformed[location]) {
      transformed[location] = {};
    }

    if (!transformed[location][date]) {
      transformed[location][date] = {
        location,
        date,
        min: [],
        max: [],
      };
    }

    transformed[location][date].min.push(item.min);
    transformed[location][date].max.push(item.max);
  });

  return Object.values(transformed).flatMap(locData =>
    Object.values(locData).map(({ location, date, min, max }) => ({
      location,
      date,
      min,
      max,
      avg:
        min.length > 0 && max.length > 0
          ? (Math.min(...min) + Math.max(...max)) / 2
          : undefined,
    }))
  );
};

export default transformFilteredDateRangeTemperatureData;
