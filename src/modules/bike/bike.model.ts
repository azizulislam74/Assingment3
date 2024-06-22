import { model } from "mongoose";
import { TBike } from "./bike.interface";
import { Schema } from "mongoose";

const bikeSchema = new Schema<TBike>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  pricePerHour: {
    type: Number,
    required: [true, "Price per hour is required"],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  cc: {
    type: Number,
    required: [true, "Engine capacity (cc) is required"],
  },
  year: {
    type: Number,
    required: [true, "Manufacturing year is required"],
  },
  model: {
    type: String,
    required: [true, "Model is required"],
  },
  brand: {
    type: String,
    required: [true, "Brand is required"],
  },
});

bikeSchema.pre("find", async function (next) {
  next();
});

export const BikeModel = model<TBike>("Bike", bikeSchema);
