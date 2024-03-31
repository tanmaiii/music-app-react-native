import { Router } from "express";
const router = Router();
import userController from "../controllers/user.controller.js";
import userValidation from "../validations/user.validation.js";
import validate from "../middlewares/validate.js";

router.get("/", validate(userValidation.getAllUser), userController.getAllUser);
router.get("/me", validate(userValidation.getMe), userController.getMe);
router.post("/email", validate(userValidation.findByEmail),userController.findByEmail);
router.get("/:userId", validate(userValidation.getUser), userController.getUser);
router.put("/", validate(userValidation.updateUser), userController.updateUser);

export default router;
