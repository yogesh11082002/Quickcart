import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true }, // ✅ lowercase p
  pincode: { type: Number, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
});

const Address =
  mongoose.models.Address || mongoose.model("Address", addressSchema);

export default Address;
