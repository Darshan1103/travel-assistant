// routes/userRoutes.js
import express from "express";
import {
  addFavorite,
  addSearchHistory,
  getFavorites,
  deleteFavorite,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js"; // ensures userId from token

const router = express.Router();

router.post("/favorites", authMiddleware, addFavorite);
router.get("/favorites", authMiddleware, getFavorites);
router.delete("/favorites/:name", authMiddleware, deleteFavorite);
router.post("/search", authMiddleware, addSearchHistory);

export default router;
