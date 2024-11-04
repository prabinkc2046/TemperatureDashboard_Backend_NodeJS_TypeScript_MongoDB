import { dbEvent } from '../database';
import { loadAndInsertData } from '../utils/dataImporter';
import { Application } from 'express';
const handleDbConnection = (app: Application, PORT: number, HOST: string) => {
  // Event listener
  dbEvent.on('connected', async () => {
    console.log('Event: MongoDB connection successful!');
    // await loadAndInsertData();
    app.listen(PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
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
