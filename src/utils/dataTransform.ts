import { LocationDocument } from '../types/temperature';
import { TransformedData } from '../types/temperature';

const transformData = (data: LocationDocument[]): TransformedData[] => {
  const result: Record<string, TransformedData[]> = {};

  data.forEach(item => {
    const { location: loc, dailyTemperatures } = item;
    dailyTemperatures.forEach(({ date, temperature }) => {
      const formattedDate = date.toISOString().split('T')[0];
      if (!result[formattedDate]) {
        result[formattedDate] = [];
      }
      const transformedEntry: TransformedData = {
        location: loc.suburb,
        date: formattedDate,
        min: [temperature.min],
        max: [temperature.max],
      };

      result[formattedDate].push(transformedEntry);
    });
  });

  //   calculate average
  Object.keys(result).forEach(date => {
    const entries = result[date];
    const minTemps: number[] = [];
    const maxTemps: number[] = [];

    // collect
    entries.forEach(entry => {
      minTemps.push(...entry.min);
      maxTemps.push(...entry.max);
    });

    const avgMin = minTemps.reduce((a, b) => a + b, 0) / minTemps.length;
    const avgMax = maxTemps.reduce((a, b) => a + b, 0) / maxTemps.length;

    entries.forEach(entry => {
      entry.avg = (avgMin + avgMax) / 2;
    });
  });

  //   flatten
  return Object.values(result).flat();
};

export default transformData;
