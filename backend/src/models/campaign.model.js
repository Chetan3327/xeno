import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  name: String,
  message: String,
  audienceSize: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Campaign = mongoose.model("Campaign", campaignSchema);
export default Campaign;
