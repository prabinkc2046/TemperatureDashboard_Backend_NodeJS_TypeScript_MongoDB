import mongoose, { Document } from 'mongoose';

export interface TransformedData {
  location: string;
  date: string;
  min: number[];
  max: number[];
  avg?: number;
}

// Define TypeScript interfaces for the schema
interface TemperatureRange {
  min: number;
  max: number;
}

interface DailyTemperature {
  date: Date;
  temperature: TemperatureRange;
}

export interface LocationDocument extends Document {
  location: {
    suburb: string;
    postcode: string;
  };
  dailyTemperatures: DailyTemperature[];
}

export interface FilteredDateRangeDailyTemperatureData {
  location: string;
  date: Date;
  min: number;
  max: number;
}

export interface QueryParamsFilteredDateRange {
  startDate?: string;
  endDate?: string;
  location?: string;
}
