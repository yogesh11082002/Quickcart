import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  // Clerk user ID (string, not Mongo ObjectId)
  userId: { type: String, required: true }, 
  
  // Products in the order
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],

  amount: { type: Number, required: true },
  address: { type: String, required: true }, // Just plain string
  status: { type: String, default: "Order Placed" },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
