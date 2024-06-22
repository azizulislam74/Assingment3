import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../app/utils/catchAsync";
import { sendResponse } from "../../app/utils/sendResponse";
import { BikeService } from "./bike.service";

const createBike = catchAsync(async (req, res) => {
  const result = await BikeService.createBikeData(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Bike added successfully",
    data: result,
  });
});

const updateBike = catchAsync(async (req, res) => {
  const result = await BikeService.updateBikeData(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Bike updated successfully",
    data: result,
  });
});
const deleteBike = catchAsync(async (req, res) => {
  const result = await BikeService.deleteBikeData(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Bike deleted successfully",
    data: result,
  });
});
const getAllBike = catchAsync(async (req, res) => {
  const result = await BikeService.getAllBikeData();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Bikes retrieved successfully",
    data: result,
  });
});

export const BikeController = {
  createBike,
  getAllBike,
  updateBike,
  deleteBike,
};
