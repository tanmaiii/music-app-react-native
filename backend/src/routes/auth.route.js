import { Router } from "express";
const router = Router();
import authController from "../controllers/auth.controller.js";
import authValidation from "../validations/auth.validation.js";
import validate from "../middlewares/validate.js";

router.post("/signin", validate(authValidation.signin), authController.signin);
router.post("/signup", validate(authValidation.signup), authController.signup);
router.get("/signout", authController.signout);
router.post(
  "/forgot-password",
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);
router.post(
  "/reset-password",
  validate(authValidation.resetPassword),
  authController.resetPassword
);

router.post(
  "/send-verification-email",
  validate(authController.sendVerificationEmail),
  authController.sendVerificationEmail
);
router.post("/verify-email", validate(authController.verifyEmail), authController.verifyEmail);
router.post(
  "/change-password",
  validate(authValidation.changePassword),
  authController.changePassword
);

export default router;
