import { Router } from "express";
import { auth } from "../../app/middleware/Auth";
import { userRole } from "./user.constant";
import { UserValidation } from "./user.validation";
import validateRequest from "../../app/middleware/validateRequest";
import { UserController } from "./user.controller";

const router = Router();
//get user profile
router.get(
  "/me",
  auth(userRole.admin, userRole.user),
  UserController.getUserProfile
);
//update user profile
router.put(
  "/me",
  auth(userRole.admin, userRole.user),
  validateRequest(UserValidation.updateZodUserValidation),
  UserController.updateUserProfile
);

export const UserRoute = router;
