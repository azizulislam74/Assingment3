import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../app/utils/catchAsync";
import { sendResponse } from "../../app/utils/sendResponse";
import { BikeModel } from "../bike/bike.model";
import AppError from "../../app/error/AppError";
import { BookingService } from "./booking.service";
//create rental by user
const createRental = catchAsync(async (req, res) => {
  const bike = await BikeModel.findOne({ _id: req.body.bikeId }).select(
    "isAvailable"
  );

  if (!bike?.isAvailable) {
    throw new AppError(StatusCodes.NOT_FOUND, "Bike is not available");
  }

  const rental = req.body;
  rental.userId = req.user.data.id;
  const result = await BookingService.createRentalData(req.body);
  if (result) {
    const bikeUpdate = await BikeModel.findOneAndUpdate(
      { _id: req.body.bikeId },
      { isAvailable: false }
    );
  }
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Rental created successfully",
    data: result,
  });
});
//get all rental using user id
const getAllRental = catchAsync(async (req, res) => {
  const result = await BookingService.getAllRentalData(req.user.data.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Rentals retrieved successfully",
    data: result,
  });
});
//update rental return by admin
const updateRentalReturn = catchAsync(async (req, res) => {
  const result = await BookingService.updateRentalReturnData(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Rentals retrieved successfully",
    data: result,
  });
});

export const BookingController = {
  createRental,
  getAllRental,
  updateRentalReturn,
};
