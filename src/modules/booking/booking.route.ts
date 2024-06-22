import { Router } from "express";
import { auth } from "../../app/middleware/Auth";
import { userRole } from "../user/user.constant";
import validateRequest from "../../app/middleware/validateRequest";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controller";

const router = Router();
//create rental by user
router.post(
  "/",
  auth(userRole.user),
  validateRequest(BookingValidation.createZodBookingValidation),
  BookingController.createRental
);
//get all rental for user
router.get("/", auth(userRole.user), BookingController.getAllRental);
//update rental return by admin
router.put(
  "/:id/return",
  auth(userRole.admin),
  validateRequest(BookingValidation.updateZodBookingValidation),
  BookingController.updateRentalReturn
);

export const BookingRoute = router;
