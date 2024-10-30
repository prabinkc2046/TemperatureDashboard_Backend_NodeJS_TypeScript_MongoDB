import mongoose, { Schema, Document } from 'mongoose';
import { LocationDocument } from '../types/temperature';
// Define the schema
const TemperatureSchema: Schema = new Schema({
  location: {
    suburb: { type: String, required: true },
    postcode: { type: String, required: true },
  },
  dailyTemperatures: [
    {
      date: { type: Date, required: true },
      temperature: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
      },
    },
  ],
});

// Export the model
const TemperatureModel = mongoose.model<LocationDocument>(
  'Temperature',
  TemperatureSchema
);
export default TemperatureModel;
