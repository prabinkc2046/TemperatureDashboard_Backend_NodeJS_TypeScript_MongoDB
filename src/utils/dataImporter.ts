import TemperatureModel from '../models/dailyTemperatureByLocationModel';
import { LocationDocument } from '../types/temperature';
import path from 'path';
import fs from 'fs';

export const insertTemperatureData = async (data: LocationDocument[]) => {
  try {
    await TemperatureModel.insertMany(data);
    console.log('Data successfully inserted into MongoDB');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

// Load Json data and insert it into database

export const loadAndInsertData = async () => {
  const filePath = path.resolve(__dirname, 'temperatureData.json');
  const rawData = fs.readFileSync(filePath, 'utf8');

  const data = JSON.parse(rawData);

  await insertTemperatureData(data);
};
