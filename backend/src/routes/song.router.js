import { Router } from "express";
const router = Router();
import songController from "../controllers/song.controller.js";
import songValidation from "../validations/song.validation.js";
import validate from "../middlewares/validate.js";

router.post("/detail/:songId", validate(songValidation.getSong), songController.getSong);
router.put("/:songId", validate(songValidation.updateSong), songController.updateSong);
router.post("/", validate(songValidation.createSong), songController.createSong);
router.patch("/delete/:songId", validate(songValidation.deleteSong), songController.deleteSong);
router.patch("/restore/:songId", validate(songValidation.restoreSong), songController.restoreSong);
router.delete("/destroy/:songId", validate(songValidation.destroySong), songController.destroySong);

router.get("/", validate(songValidation.getAllSong), songController.getAllSong);

router.get(
  "/playlist/:playlistId",
  validate(songValidation.getAllSongByPlaylist),
  songController.getAllSongByPlaylist
);

router.get("/me", validate(songValidation.getAllSongByMe), songController.getAllSongByMe);

router.get(
  "/user/:userId",
  validate(songValidation.getAllSongByUser),
  songController.getAllSongByUser
);

router.get(
  "/like",
  validate(songValidation.getAllFavoritesByUser),
  songController.getAllFavoritesByUser
);

router.post("/like/:songId", validate(songValidation.like), songController.likeSong);
router.delete("/like/:songId", validate(songValidation.unLike), songController.unLikeSong);
router.get("/checkLiked/:songId", songController.checkSongLiked);

export default router;
