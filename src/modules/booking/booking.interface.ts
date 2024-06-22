import { Types } from "mongoose";

export type TBooking = {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: string;
  endTime: string;
  returnTime: string;
  totalCost: number;
  isReturned: boolean;
};
