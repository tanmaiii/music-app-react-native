import { Router } from "express";
const router = Router();

import songPlayController from "../controllers/songPlay.controller.js";
import songPlayValidation from "../validations/songPlay.validation.js";
import validate from "../middlewares/validate.js";

router.get("/:songId/count", validate(songPlayValidation.countListened), songPlayController.getCount);

router.post("/:songId", validate(songPlayValidation.createSongPlay), songPlayController.playSong);

export default router;
