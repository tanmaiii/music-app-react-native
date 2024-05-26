import { Router } from "express";
const router = Router();
import playlistController from "../controllers/playlist.controller.js";
import playlistValidation from "../validations/playlist.validation.js";

import validate from "../middlewares/validate.js";

router.put("/song/:playlistId", validate(playlistValidation.updateSong), playlistController.updateSongPlaylist);
router.post("/song", validate(playlistValidation.addSong), playlistController.addSongPlaylist);
router.delete(
  "/song",
  validate(playlistValidation.unAddSong),
  playlistController.unAddSongPlaylist
);

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
router.put(
  "/:playlistId",
  validate(playlistValidation.updatePlaylist),
  playlistController.updatePlaylist
);

router.patch(
  "/delete/:playlistId",
  validate(playlistValidation.deletePlaylist),
  playlistController.deletePlaylist
);
router.patch(
  "/restore/:playlistId",
  validate(playlistValidation.restorePlaylist),
  playlistController.restorePlaylist
);
router.delete(
  "/destroy/:playlistId",
  validate(playlistValidation.destroyPlaylist),
  playlistController.destroyPlaylist
);

router.get(
  "/checkLiked/:playlistId",
  validate(playlistValidation.checkLike),
  playlistController.checkPlaylistLike
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

router.post(
  "/checkSong",
  validate(playlistValidation.addSong),
  playlistController.checkSongInPlaylist
);

export default router;
