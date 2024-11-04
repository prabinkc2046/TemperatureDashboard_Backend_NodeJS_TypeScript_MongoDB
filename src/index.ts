import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// module import
import { connectDB } from './database';
import handleDbConnection from './events/handleDatabaseConnection';

// import routes
import queryAll from './routes/queryAll';
import queryByStartNEndDate from './routes/queryByStartNEndDateRoutes';
import queryByLastNdays from './routes/queryByLastNdays';

// Loading  env variables
dotenv.config();
const app = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const HOST: string = process.env.HOST || '0.0.0.0'; // Default to listen on all interfaces

// setting up middle ware
const allowedOrigins = new Set((process.env.ALLOWED_ORIGINS || '*').split(','));
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/temperature', queryAll);
app.use('/api/temperature/range', queryByStartNEndDate);
app.use('/api/temperature/last', queryByLastNdays);

// database connection events
handleDbConnection(app, PORT, HOST);

// Attemp to connect to mongodb
connectDB();
