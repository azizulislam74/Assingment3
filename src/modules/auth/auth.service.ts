import { StatusCodes } from "http-status-codes";
import AppError from "../../app/error/AppError";
import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import jwt from "jsonwebtoken";
import config from "../../app/config";

const createUserData = async (payload: TUser) => {
  const user = await UserModel.create(payload);
  const result = await UserModel.findOne({ _id: user._id });

  return result;
};
const loginUserService = async (payload: TUser) => {
  const result = await UserModel.findOne({ email: payload?.email }).select(
    "-createdAt -updatedAt"
  );
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  const data = {
    id: result._id,
    email: result.email,
    role: result.role,
  };
  const accessToken = jwt.sign(
    {
      data,
    },
    config.jwt_access_secret as string,
    { expiresIn: "100d" }
  );
  return { accessToken, result };
};

export const AuthService = {
  createUserData,
  loginUserService,
};
