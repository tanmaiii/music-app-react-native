import { Router } from "express";
const router = Router();

import songPlayController from "../controllers/songPlay.controller.js";
import songPlayValidation from "../validations/songPlay.validation.js";
import validate from "../middlewares/validate.js";

router.post(
  "/:songId",
  validate(songPlayValidation.createSongPlay),
  songPlayController.createSongPlay
);

router.get("/:songId", songPlayController.getCountSongPlay);

export default router;
