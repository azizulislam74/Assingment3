import { StatusCodes } from "http-status-codes";
import AppError from "../../app/error/AppError";
import { BikeModel } from "../bike/bike.model";
import mongoose, { startSession } from "mongoose";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
//create rental service
const createRentalData = async (payload: Partial<TBooking>) => {
  const result = await BookingModel.create(payload);
  return result;
};
//retrieving all rental service for user 
const getAllRentalData = async (id: string) => {
  const result = await BookingModel.find({ userId: id });
  return result;
};
//update rental return data by admin
const updateRentalReturnData = async (id: string) => {
  const rental = await BookingModel.findOne({ _id: id });
  if (!rental) {
      throw new AppError(StatusCodes.NOT_FOUND, "Rentals not found");
    }
   
    const session =await mongoose.startSession()
 try {
    session.startTransaction()
       
    //getting return data
    const returnTime = new Date().toISOString();
    const startTime = new Date(rental.startTime).getTime();
    const endTime = new Date(returnTime).getTime();
    const durationInHours = (endTime - startTime) / (1000 * 60 * 60);
    const bike = await BikeModel.findOne({ _id: rental.bikeId }).select(
        "pricePerHour"
    );
    if (!bike?.pricePerHour) {
        throw new AppError(StatusCodes.NOT_FOUND, "");
    }
    const totalCost = durationInHours * bike?.pricePerHour;
    // Update the rental document
    rental.returnTime = returnTime;
    rental.totalCost = totalCost;
    rental.isReturned = true;
    const result = await BookingModel.findOneAndUpdate({ _id: id }, rental, {
        new: true,
        session
    });
    
 
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Rental not found");
  }


  const bikeUpdate = await BikeModel.findOneAndUpdate(
    { _id: rental.bikeId },
    { isAvailable: true },
    { new: true,session }
  );
  await session.commitTransaction()
  await session.endSession()
  return result;


 } catch (error) {
    await session.abortTransaction()
    await session.endSession()
 }
};

export const BookingService = {
  createRentalData,
  getAllRentalData,
  updateRentalReturnData,
};
