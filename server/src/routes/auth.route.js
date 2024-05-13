import { Router } from "express";
const router = Router();
import authController from "../controllers/auth.controller.js";
import authValidation from "../validations/auth.validation.js";
import validate from "../middlewares/validate.js";

router.post("/signin", validate(authValidation.signin), authController.signin);
router.post("/signup", validate(authValidation.signup), authController.signup);
router.get("/signout", authController.signout);
router.post(
  "/verify-forgot-password",
  validate(authValidation.verifyForgotPassword),
  authController.verifyPassword
);
router.post(
  "/reset-password",
  validate(authValidation.resetPassword),
  authController.resetPassword
);
router.post(
  "/send-verify-account",
  validate(authValidation.sendVerify),
  authController.sendVerifyAccount
);
router.post(
  "/verify-account",
  validate(authValidation.verifyAccount),
  authController.verifyAccount
);
router.post(
  "/change-password",
  validate(authValidation.changePassword),
  authController.changePassword
);

router.post(
  "/send-verify-email",
  validate(authValidation.sendVerify),
  authController.sendVerifyEmail
);

router.post("/verify-email", validate(authValidation.verifyEmail), authController.verifyEmail);

export default router;
