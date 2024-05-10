import { Router } from "express";
const router = Router();
import followController from "../controllers/follow.controller.js";
import followsValidation from "../validations/follow.validation.js";
import validate from "../middlewares/validate.js";

router.get(
  "/following/:userId/count",
  validate(followsValidation.getCountFollowing),
  followController.getCountFollowing
);
router.get(
  "/followers/:userId/count",
  validate(followsValidation.getCountFollowers),
  followController.getCountFollowers
);
router.get(
  "/followers/:userId",
  validate(followsValidation.getAllFollowers),
  followController.getAllFollowers
);
router.get(
  "/following/:userId",
  validate(followsValidation.getAllFollowing),
  followController.getAllFollowing
);

router.post("/:userId", validate(followsValidation.addFollow), followController.addFollow);
router.delete("/:userId", validate(followsValidation.removeFollow), followController.removeFollow);
router.get(
  "/:userId/check",
  validate(followsValidation.checkFollowing),
  followController.checkFollowing
);

export default router;
