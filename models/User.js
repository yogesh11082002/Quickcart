import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },        
    email: {
        type: String,
        required: true,
        unique: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    _id : {
        type: String,
        required: true,
        
    },
    cartItems: {
        type: Object,
        default: {},
    },
}, {minimize: false, timestamps: true});

const User = mongoose.models.user || mongoose.model("User", userSchema);

export default User;