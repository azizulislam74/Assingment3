import express, { Request, Response } from 'express'
import cors from 'cors'
import config from './app/config'
import { globalErrorHandler } from './app/middleware/globalErrorHandler'
import { notFound } from './app/middleware/notFound'
import router from './app/route'
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api',router)

app.get('/',(req:Request,res:Response)=>{
    res.status(200).json({
        success:true,
        message:`Server Connected on ${config.port}`,
        data:"Server Running"
    })
})

app.use(globalErrorHandler)
app.use(notFound)

export default app
