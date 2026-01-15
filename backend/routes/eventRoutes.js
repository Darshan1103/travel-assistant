// routes/eventRoutes.js
import express from "express";
import { getCityEvents } from "../controllers/eventController.js";

const router = express.Router();

router.get("/:city", getCityEvents);

export default router;
