import express from "express";
import { getAllProducts } from "../controllers/productController";
import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/products", getAllProducts);


export default router;
