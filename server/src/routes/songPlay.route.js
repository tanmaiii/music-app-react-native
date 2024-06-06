import { Router } from "express";
const router = Router();

import songPlayController from "../controllers/songPlay.controller.js";
import songPlayValidation from "../validations/songPlay.validation.js";
import validate from "../middlewares/validate.js";

router.post("/:songId", validate(songPlayValidation.createSongPlay), songPlayController.playSong);

router.get("/:songId", validate(songPlayValidation.countListened), songPlayController.getCount);

export default router;
