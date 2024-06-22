import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../app/utils/sendResponse";
import { catchAsync } from "../../app/utils/catchAsync";
import { UserService } from "./user.service";

const getUserProfile = catchAsync(async (req, res) => {
  const result = await UserService.getUserProfileData(req.user.data);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User profile retrieved successfully",
    data: result,
  });
});
const updateUserProfile = catchAsync(async (req, res) => {
  const result = await UserService.updateUserProfileData(
    req.user.data,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Profile updated successfully",
    data: result,
  });
});

export const UserController = {
  getUserProfile,
  updateUserProfile,
};
