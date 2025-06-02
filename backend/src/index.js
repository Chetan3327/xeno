import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import customerRoutes from "./routes/customer.route.js";
import orderRoutes from "./routes/order.route.js";
import userRoutes from "./routes/user.route.js"
import audienceRoutes from "./routes/audience.route.js"
import "./pubsub/consumer.js";
import morgan from "morgan";
import cors from "cors"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (_, res) => {
 res.send("Hello !");
});

app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/user", userRoutes)
app.use("/api/audience", audienceRoutes)

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
