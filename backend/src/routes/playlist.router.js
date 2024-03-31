import { Router } from "express";
const router = Router();
import playlistController from "../controllers/playlist.controller.js";
import playlistValidation from "../validations/playlist.validation.js";

import validate from "../middlewares/validate.js";

router.get(
  "/detail/:playlistId",
  validate(playlistValidation.getPlaylist),
  playlistController.getPlaylist
);
router.get(
  "/user/:userId",
  validate(playlistValidation.getAllPlaylistByUser),
  playlistController.getAllPlaylistByUser
);
router.get(
  "/me",
  validate(playlistValidation.getAllPlaylistByMe),
  playlistController.getAllPlaylistByMe
);
router.get("/", validate(playlistValidation.getAllPlaylist), playlistController.getAllPlaylist);
router.post("/", validate(playlistValidation.createPlaylist), playlistController.createPlaylist);
router.delete(
  "/:playlistId",
  validate(playlistValidation.deletePlaylist),
  playlistController.deletePlaylist
);
router.put(
  "/:playlistId",
  validate(playlistValidation.updatePlaylist),
  playlistController.updatePlaylist
);

router.get(
  "/like",
  validate(playlistValidation.getAllFavoritesByUser),
  playlistController.getAllFavoritesByUser
);

router.post(
  "/like/:playlistId",
  validate(playlistValidation.like),
  playlistController.likePlaylist
);

router.delete(
  "/like/:playlistId",
  validate(playlistValidation.unLike),
  playlistController.unLikePlaylist
);

router.post("/song", validate(playlistValidation.addSong), playlistController.addSongPlaylist);
router.delete(
  "/song",
  validate(playlistValidation.unAddSong),
  playlistController.unAddSongPlaylist
);

export default router;
