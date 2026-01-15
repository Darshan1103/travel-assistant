import express from "express";
import { getCityInfo } from "../controllers/travelController.js";

const router = express.Router();

// Example: GET /api/travel/:city
router.get("/:city", getCityInfo);

export default router;
