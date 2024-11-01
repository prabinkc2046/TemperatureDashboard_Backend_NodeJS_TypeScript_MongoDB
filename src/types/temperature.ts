import mongoose, { Document } from 'mongoose';

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

export interface QueryParams {
  startDate?: string;
  endDate?: string;
  location?: string;
}

export interface TemperatureDataFilteredByLastNdays {
  location: string;
  date: Date;
  min: number;
  max: number;
}
