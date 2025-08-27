
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   _id: { type: String, required: true }, // Clerk user id
//   email: { type: String, required: true , unique: true},
//   name: { type: String , required:true },
//   imageUrl: { type: String }, // ✅ camelCase
//   cartItems :{type:Object, default:{}}
// },{minimize:false});

// // ✅ Prevent OverwriteModelError in serverless
// export default mongoose.models.User || mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Clerk user ID
  email: { type: String, default: "" },
  name: { type: String, default: "User" },
  imageUrl: { type: String, default: "" },
  cartItems: { type: Object, default: {} },
}, { minimize: false });

export default mongoose.models.User || mongoose.model("User", userSchema);
