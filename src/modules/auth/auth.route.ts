import { Router } from "express";
import  validateRequest  from "../../app/middleware/validateRequest";
import { UserValidation } from "../user/user.validation";
import { AuthController } from "./auth.controller";
import { auth } from "../../app/middleware/Auth";
import { userRole } from "../user/user.constant";

const router = Router()

router.post('/signup',validateRequest(UserValidation.createZodUserValidation),AuthController.createUser)
router.post('/login',AuthController.loginUser)

export const AuthRoute = router