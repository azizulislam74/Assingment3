import { Router } from "express";
import { auth } from "../../app/middleware/Auth";
import { userRole } from "../user/user.constant";
import validateRequest from "../../app/middleware/validateRequest";
import { BikeValidation } from "./bike.validation";
import { BikeController } from "./bike.controller";

const router = Router();

router.post(
  "/",
  auth(userRole.admin),
  validateRequest(BikeValidation.createZodBikeSchema),
  BikeController.createBike
);
router.get("/", BikeController.getAllBike);
router.put(
  "/:id",
  auth(userRole.admin),
  validateRequest(BikeValidation.updateZodBikeSchema),
  BikeController.updateBike
);
router.delete("/:id", auth(userRole.admin), BikeController.deleteBike);

export const BikeRoute = router;
