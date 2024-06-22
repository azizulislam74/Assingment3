import { JwtPayload } from "jsonwebtoken";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const getUserProfileData = async (payload: JwtPayload) => {
  const result = await UserModel.findOne({ _id: payload.id });
  return result;
};
const updateUserProfileData = async (
  payload: JwtPayload,
  updateData: Partial<TUser>
) => {
  const result = await UserModel.findOneAndUpdate(
    { _id: payload.id },
    updateData,
    { new: true }
  ).select("-createdAt -updatedAt");
  return result;
};

export const UserService = {
  getUserProfileData,
  updateUserProfileData,
};
