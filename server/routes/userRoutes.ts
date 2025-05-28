import express from "express";
import {addFavorite,removeFavorite,getUserFavorites } from "../controllers/userController";
import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();
router.get("/getUserFavs", requireAuth, getUserFavorites);
router.post("/addfavs/:petId",requireAuth,addFavorite);
router.delete("/removefavs/:petId",requireAuth,removeFavorite);

export default router;
