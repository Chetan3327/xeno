import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import customerRoutes from "./routes/customer.route.js";
import orderRoutes from "./routes/order.route.js";
import "./pubsub/consumer.js";
import morgan from "morgan";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_, res) => {
 res.send("Hello !");
});

app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
