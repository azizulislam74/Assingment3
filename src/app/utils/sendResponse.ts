import { Response } from "express";


type TSendResponse <T>= {
    statusCode : number,
    success:boolean,
    message:string,
    token?:string,
    data: T
}

export const sendResponse=<T>(res:Response,payload:TSendResponse<T>)=>{
    return res.status(payload.statusCode).json({
        success:payload.success,
        statusCode:payload.statusCode,
        message:payload.message,
        token:payload.token,
        data:payload.data
    })
}