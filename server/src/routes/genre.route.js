import { Router } from "express";
const router = Router();
import genreController from "../controllers/genre.controller.js";
import genreValidation from "../validations/genre.validation.js";
import validate from "../middlewares/validate.js";

router.get(
  "/songs/:genreId",
  validate(genreValidation.getAllSongsGenre),
  genreController.getAllSongsGenre
);

router.get(
  "/playlists/:genreId",
  validate(genreValidation.getAllSongsGenre),
  genreController.getAllPlaylistsGenre
);

router.get("/:genreId", validate(genreValidation.getGenre), genreController.getGenre);
router.post("/", validate(genreValidation.createGenre), genreController.createGenre);
router.put("/:genreId", validate(genreValidation.updateGenre), genreController.updateGenre);
router.delete("/:genreId", validate(genreValidation.deleteGenre), genreController.deleteGenre);
router.get("/", validate(genreValidation.getAllGenres), genreController.getAllGenres);

export default router;
