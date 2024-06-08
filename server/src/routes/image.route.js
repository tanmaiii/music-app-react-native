import { Router } from "express";
const router = Router();
import uploadImage from "../middlewares/uploadImage.js";
import imageController from "../controllers/image.controller.js";

router.post("/", uploadImage, imageController.uploadImage);
router.delete("/", imageController.deleteImage);

export default router;
