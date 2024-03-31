import { Router } from "express";
const router = Router();
import followController from "../controllers/follow.controller.js";

router.get("/following/:userId/count", followController.getCountFollowing);
router.get("/followers/:userId/count", followController.getCountFollowers);
router.get("/followers/:userId", followController.getAllFollowers);
router.get("/following/:userId", followController.getAllFollowing);
router.post("/:userId", followController.addFollow);
router.delete("/:userId", followController.removeFollow);

export default router;
