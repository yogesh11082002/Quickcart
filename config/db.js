
// import mongoose from "mongoose";

// let isConnected = null; // cache the connection across hot reloads

// const connectDB = async () => {
//   if (isConnected) {
//     console.log("🟢 Using existing MongoDB connection");
//     return;
//   }

//   if (!process.env.MONGODB_URI) {
//     throw new Error("❌ MONGODB_URI not set in environment variables");
//   }

//   try {
//     const db = await mongoose.connect(process.env.MONGODB_URI, {
//       dbName: "quickcart", // optional
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     isConnected = db.connections[0].readyState === 1;
//     console.log("✅ MongoDB connected:", isConnected);
//   } catch (err) {
//     console.error("❌ MongoDB connection failed:", err);
//     throw err;
//   }
// };

// export default connectDB;

import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    console.log("🟢 Using cached MongoDB connection");
    return cached.conn;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI not set in environment variables");
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        dbName: "quickcart",
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("✅ New MongoDB connection established");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
