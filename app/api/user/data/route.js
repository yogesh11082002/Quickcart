
// import connectDB from "@/config/db";
// import User from "@/models/User";
// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export async function GET(request) {
//   try {
//     // Get userId from Clerk
//     const { userId } = getAuth(request);

//     if (!userId) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized: No user ID" },
//         { status: 401 }
//       );
//     }

//     // Connect to MongoDB
//     await connectDB();

//     // Find user by Clerk ID
//     let user = await User.findById(userId);

//     // If user doesn’t exist, optionally create one
//     if (!user) {
//       console.log(`User not found in DB, creating new user: ${userId}`);

//       // Here you can get Clerk user info if needed
//       // For simplicity, minimal fields:
//       user = await User.create({
//         _id: userId,
//         email: "unknown@example.com", // replace if you can get email from Clerk
//         name: "New User",
//         cartItems: {},
//       });
//     }

//     return NextResponse.json({ success: true, user });
//   } catch (error) {
//     console.error("API error:", error);
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }


import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Get Clerk userId
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No user ID" },
        { status: 401 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Find user by Clerk ID
    const user = await User.findById(userId);

    if (!user) {
      // If no user in DB, just return 404 — DO NOT create dummy
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Return user
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
