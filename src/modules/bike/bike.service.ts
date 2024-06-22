import { StatusCodes } from "http-status-codes";
import AppError from "../../app/error/AppError";
import { TBike } from "./bike.interface";
import { BikeModel } from "./bike.model";

const createBikeData = async (payload: TBike) => {
  const result = await BikeModel.create(payload);
  return result;
};

const getAllBikeData = async () => {
  const result = await BikeModel.find({ isAvailable: true });
  if (Object.keys(result).length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "No bike available");
  }
  return result;
};

const updateBikeData = async (id: string, payload: Partial<TBike>) => {
  const result = await BikeModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteBikeData = async (id: string) => {
  const result = await BikeModel.findOneAndUpdate(
    { _id: id },
    { isAvailable: false },
    { new: true }
  );
  return result;
};

export const BikeService = {
  createBikeData,
  getAllBikeData,
  updateBikeData,
  deleteBikeData,
};
