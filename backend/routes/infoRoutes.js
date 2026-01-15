import express from "express";
import { getCityInfoAndWeather } from "../controllers/infoController.js";

const router = express.Router();

// GET /api/info/:city
router.get("/:city", getCityInfoAndWeather);

export default router;
