import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../error/AppError";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../../modules/user/user.constant";
import { UserModel } from "../../modules/user/user.model";

export const auth = (...role: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token)
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "You have no access to this route"
      );
   const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    );
    
    
      // decoded
      const decodedId = (decoded as JwtPayload)?.data.id;
      const user = await UserModel.findOne({ _id: decodedId });
      if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, "This user not found !");
      }

      const decodedRole = role.includes((decoded as JwtPayload)?.data.role);
      if (role && !decodedRole) {
        throw new AppError(
          StatusCodes.UNAUTHORIZED,
          "You have no access to this route"
        );
      }
      req.user = decoded as JwtPayload;
      next();
    





  })};
