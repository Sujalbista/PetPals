import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }]
});

export default mongoose.model("Cart", cartSchema);
