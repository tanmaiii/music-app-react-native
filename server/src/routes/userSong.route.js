import { Router } from "express";
const router = Router();

import userSongController from "../controllers/userSong.controller.js";
import userSongValodation from "..//validations/userSong.validation.js";
import validate from "../middlewares/validate.js";

router.get("/:songId", validate(userSongValodation.getAllUserConfirm), userSongController.getAllUserConfirm);

export default router;
