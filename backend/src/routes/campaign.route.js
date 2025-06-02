import express from "express";
import {createCampaign, getCampaigns, getCampaignById} from '../controllers/campaign.controller.js'

const router = express.Router();

router.get("/", getCampaigns);
router.get("/:id", getCampaignById); 
router.post("/", createCampaign);


export default router;