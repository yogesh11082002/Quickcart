// import mongoose from "mongoose";

// const cached = global.mongoose;
// if (!cached) {
//   global.mongoose = { conn: null, promise: null };
// }

// async function connectDB() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     };

//     cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/quickcart`, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }
  
//   cached.conn = await cached.promise;
//   return cached.conn;
// }
// export default connectDB;

import mongoose from "mongoose";

let isConnected = null; // cache the connection across hot reloads

const connectDB = async () => {
  if (isConnected) {
    console.log("🟢 Using existing MongoDB connection");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI not set in environment variables");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "quickcart", // optional
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB connected:", isConnected);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
};

export default connectDB;
