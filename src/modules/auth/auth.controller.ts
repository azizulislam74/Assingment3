import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../app/utils/catchAsync";
import { sendResponse } from "../../app/utils/sendResponse";
import { AuthService } from "./auth.service";

const createUser = catchAsync(async (req, res) => {
  const result = await AuthService.createUserData(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUserService(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User logged in successfully",
    token: result.accessToken,
    data: result.result,
  });
});

export const AuthController = {
  createUser,
  loginUser,
};
