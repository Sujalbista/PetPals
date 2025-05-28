import express from "express";
import { getAllPets, addToCart, heartPet ,checkout } from "../controllers/petController";
import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();
router.get("/pets", getAllPets);
router.post("/cart", requireAuth, addToCart);
router.post("/heart", requireAuth, heartPet);
router.post("/checkout",requireAuth,checkout);

export default router;
