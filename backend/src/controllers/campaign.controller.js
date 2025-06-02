import Campaign from "../models/campaign.model.js"

export const createCampaign = async (req, res) => {
  try {
    const { name, message, audienceSize } = req.body;

    if (!name || !message || typeof audienceSize !== "number") {
      return res.status(400).json({ error: "Invalid campaign data" });
    }

    const campaign = new Campaign({ name, message, audienceSize });
    await campaign.save();

    res.status(201).json({ message: "Campaign created successfully", campaign });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};