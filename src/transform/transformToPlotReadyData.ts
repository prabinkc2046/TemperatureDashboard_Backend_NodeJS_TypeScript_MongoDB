// import types
import { TemperatureDataFilteredByLastNdays } from '../types/temperature';

export interface PlotData {
  dates: string[]; // Will store formatted date strings for Plotly
  min: number[];
  max: number[];
  avg: number[];
}

export interface TransformedPlotData {
  [location: string]: PlotData;
}

export const transformDataForPlotting = (
  data: TemperatureDataFilteredByLastNdays[]
): TransformedPlotData => {
  const plotData: TransformedPlotData = {};
  data.forEach(({ location, date, min, max }) => {
    const formattedDate = date.toISOString().split('T')[0];

    if (!plotData[location]) {
      plotData[location] = { dates: [], min: [], max: [], avg: [] };
    }

    plotData[location].dates.push(formattedDate);
    plotData[location].min.push(min);
    plotData[location].max.push(max);
    plotData[location].avg.push((min + max) / 2);
  });
  return plotData;
};
