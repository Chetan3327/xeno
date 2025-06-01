import { publishMessage } from "../pubsub/producer.js";

export const createCustomer = async (req, res) => {
  try {
    await publishMessage("customer_channel", req.body);

    res.status(202).json({ message: "Customer creation requested" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
