import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "User id is required"],
    ref: "User",
  },
  bikeId: {
    type: Schema.Types.ObjectId,
    required: [true, "Bike id is required"],
    ref: "Bike",
  },
  startTime: {
    type: String,
    required: [true, "Start time is required"],
  },
  returnTime: {
    type: String,
    default: null,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
  isReturned: {
    type: Boolean,
    required: [true, "Is returned is required"],
    default: false,
  },
});

export const BookingModel = model<TBooking>("Booking", bookingSchema);
