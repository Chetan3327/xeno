import CommunicationLog from "../models/communicationLog.model.js";

export const updateDeliveryStatus = async (req, res) => {
  try {
    const { logId, status } = req.body;

    if (!["SENT", "FAILED"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const log = await CommunicationLog.findById(logId);
    if (!log) {
      return res.status(404).json({ error: "Communication log not found" });
    }

    log.status = status;
    await log.save();

    res.status(200).json({ message: "Status updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
