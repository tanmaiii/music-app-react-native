import { Router } from "express";
import searchController from "../controllers/search.controller.js";
import validate from "../middlewares/validate.js";
import searchValidation from "../validations/search.validation.js";

const router = Router();

router.get("/", validate(searchValidation.getAll), searchController.getAll);
router.get("/playlists", validate(searchValidation.getAll), searchController.getAllPlaylists);
router.get("/songs", validate(searchValidation.getAll), searchController.getAllSongs);
router.get("/artists", validate(searchValidation.getAll), searchController.getAllArtists);
router.get("/popular", validate(searchValidation.getAll), searchController.getSongPopular);

export default router;
