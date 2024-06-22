import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const globalErrorHandler = (error:any,req:Request,res:Response,next:NextFunction)=>{

   
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success : false,
        message: error.message|| "Something went wrong",
        error:error
    })
}