import Campaign from "../models/campaign.model.js";
import CommunicationLog from "../models/communicationLog.model.js";

export const createCampaign = async (req, res) => {
  try {
    const { name, message, audienceSize, customers } = req.body;
    console.log(customers)

    if (!name || !message || typeof audienceSize !== "number") {
      return res.status(400).json({ error: "Invalid campaign data" });
    }

    const campaign = new Campaign({ name, message, audienceSize });
    await campaign.save();

    const communicationLogs = [];

    for (const customer of customers) {
      const personalizedMessage = message.includes("[name]") ? message.replace(/\[name\]/g, customer.name) : message;

      // Create communication log (initially PENDING)
      const log = new CommunicationLog({
        campaignId: campaign._id,
        customerId: customer._id,
        message: personalizedMessage,
        status: "PENDING",
      });
      communicationLogs.push(log.save());

      sendToVendorAPI(log._id, customer._id, personalizedMessage);
    }

    await Promise.all(communicationLogs);
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

const sendToVendorAPI = (logId, customerId, message) => {
  // Simulate delivery with ~90% success and ~10% failure
  const isSuccess = Math.random() < 0.9;

  // Simulate network delay asynchronously
  setTimeout(async () => {
    try {
      await fetch(`${process.env.BACKEND_URL}/api/delivery-receipt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          logId,
          status: isSuccess ? "SENT" : "FAILED",
        }),
      });
    } catch (error) {
      console.error("Vendor API error:", error);
    }
  }, 1000);
};

export const getCampaignById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the campaign by id
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    // Find all communication logs with this campaign id
    const logs = await CommunicationLog.find({ campaignId: id }).populate("customerId", "name email");

    res.status(200).json({ campaign, communicationLogs: logs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};