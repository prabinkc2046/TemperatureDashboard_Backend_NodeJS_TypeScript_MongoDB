// Cache and lock management
import { TransformedPlotData } from '../transform/transformToPlotReadyData';

export const cache = new Map<
  string,
  { data: TransformedPlotData; lastUpdate: number }
>();

export const isUpdatingCache = {
  default: false,
  query: new Map<string, boolean>(),
  lastNdays: new Map<string, boolean>(),
};
