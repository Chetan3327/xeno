import express from "express";
import { googleAuth } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", googleAuth);

export default router;