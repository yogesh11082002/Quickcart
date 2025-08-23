import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Clerk user id
  email: { type: String, required: true },
  name: { type: String },
  imageurl: { type: String },
});

// ✅ Prevent OverwriteModelError in serverless
export default mongoose.models.User || mongoose.model("User", userSchema);
