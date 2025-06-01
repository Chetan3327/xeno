import { publishMessage } from "../pubsub/producer.js";

export const createOrder = async (req, res) => {
  try {
    await publishMessage("order_channel", req.body);

    res.status(202).json({ message: "Order creation requested" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
