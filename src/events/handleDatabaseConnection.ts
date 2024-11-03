import { dbEvent } from '../database';
import { loadAndInsertData } from '../utils/dataImporter';
import { Application } from 'express';
import { connectDB } from '../database';
const handleDbConnection = (app: Application, PORT: string | 3001) => {
  // Event listener
  dbEvent.on('connected', async () => {
    console.log('Event: MongoDB connection successful!');
    // await loadAndInsertData();
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
};

export default handleDbConnection;
