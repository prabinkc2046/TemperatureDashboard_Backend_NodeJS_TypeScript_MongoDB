import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// module import
import { connectDB, dbEvent } from './database';
import { loadAndInsertData } from './utils/dataImporter';

// import routes
import listAllTemperatureRoutes from './routes/listAllTemperature/temperature';
import filterAllTemperatureRoutes from './routes/filterByStartEndDateAndLocation/filteredTemperature';

// Loading  env variables
dotenv.config();
const app = express();

// setting up middle ware
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());

// port to fall back

const PORT = process.env.PORT || 3001;

// Routes
app.use('/api/temperature', listAllTemperatureRoutes);
app.use('/api/temperature/sortedbydate', filterAllTemperatureRoutes);
// Event listener
dbEvent.on('connected', async () => {
  console.log('Event: MongoDB connection successful!');
  //   await loadAndInsertData();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

dbEvent.on('connectionFailed', (retry, error, MAX_RETRIES) => {
  console.log(
    `Event: MongoDB connection attempt failed. Retries left: ${retry}/${MAX_RETRIES}`
  );
});

dbEvent.on('disconnected', MAX_RETRIES => {
  console.log(
    `Event: Failed to connect to MongoDB after ${MAX_RETRIES} retries.`
  );
});

// Attemp to connect to mongodb
connectDB();
