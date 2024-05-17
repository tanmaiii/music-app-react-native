import { Router } from "express";
import searchController from "../controllers/search.controller.js";
const router = Router();

router.get("/", searchController.getAll);

export default router;
