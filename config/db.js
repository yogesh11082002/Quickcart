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

let isConnected = false; // Track connection status

const connectDB = async () => {
  if (isConnected) {
    // 🟢 Already connected
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI not set in environment variables");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "quickcart", // optional, replace with your db name
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB connected:", isConnected);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
};

export default connectDB;
