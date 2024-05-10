import { Router } from "express";
const router = Router();
import uploadMp3 from "../middlewares/uploadMp3.js";
import mp3Controller from "../controllers/mp3.controller.js";

router.post("/", uploadMp3, mp3Controller.uploadMp3);
router.delete("/", mp3Controller.deleteMp3);

export default router;
