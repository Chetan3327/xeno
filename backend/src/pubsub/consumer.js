import { createClient } from "redis";
import Customer from "../models/customer.model.js";
import Order from "../models/order.model.js";

const subscriber = createClient();

const CHANNEL_CUSTOMER = "customer_channel";
const CHANNEL_ORDER = "order_channel";

await subscriber.connect();

subscriber.subscribe(CHANNEL_CUSTOMER, async (message) => {
  try {
    const data = JSON.parse(message);
    const customer = new Customer(data);
    await customer.save();
    console.log("Customer saved:", customer._id);
  } catch (err) {
    console.error("Error saving customer:", err);
  }
});

subscriber.subscribe(CHANNEL_ORDER, async (message) => {
  try {
    const data = JSON.parse(message);
    const order = new Order(data);
    await order.save();
    console.log("Order saved:", order._id);
  } catch (err) {
    console.error("Error saving order:", err);
  }
});

console.log("Redis consumer subscribed to channels");
