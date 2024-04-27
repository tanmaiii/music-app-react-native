import { Router } from "express";
const router = Router();
import favouriteController from "../controllers/favourite.controller.js";
// import userValidation from "../validations/user.validation.js";
import validate from "../middlewares/validate.js";
import validateValidation from "../validations/favourite.validation.js";

router.get("/", validate(validateValidation.getAlL), favouriteController.getAllFavoritesByUser);
router.get(
  "/songs",
  validate(validateValidation.getSongs),
  favouriteController.getSongsFavoritesByUser
);

router.get(
  "/playlists",
  validate(validateValidation.getAlL),
  favouriteController.getPlaylistsFavoritesByUser
);

router.get(
  "/artists",
  validate(validateValidation.getAlL),
  favouriteController.getArtistsFavoritesByUser
);

export default router;
