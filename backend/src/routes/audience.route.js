import express from "express";
import { getAudience } from "../controllers/audience.controller.js";

const router = express.Router();

router.post("/", getAudience);

export default router;