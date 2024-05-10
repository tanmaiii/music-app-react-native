import { Router } from "express";
const router = Router();
import uploadImage from "../middlewares/uploadImage.js";
import imageController from "../controllers/image.controller.js";
import imageValidations from "../validations/image.validation.js";
import validate from "../middlewares/validate.js";

router.post("/", validate(imageValidations.uploadImage), uploadImage, imageController.uploadImage);
router.delete("/", imageController.deleteImage);

export default router;
