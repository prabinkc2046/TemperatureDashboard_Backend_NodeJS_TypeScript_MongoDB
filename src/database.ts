import mongoose from 'mongoose';
import { EventEmitter } from 'events';

// connect to db
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2000;

// instance of event emitter
const dbEvent = new EventEmitter();

const connectDB = async (retry = MAX_RETRIES) => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    // Emit 'connected' event on successful connection
    dbEvent.emit('connected');
  } catch (error) {
    // Emite 'connectionFailed' for each failed attempt
    dbEvent.emit('connectionFailed', retry, error, MAX_RETRIES);
    if (retry > 0) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      return connectDB(retry - 1);
    } else {
      //   Emit disconnected event if all retries are exhausted
      dbEvent.emit('disconnected', MAX_RETRIES);
      process.exit(1);
    }
  }
};

export { connectDB, dbEvent };
