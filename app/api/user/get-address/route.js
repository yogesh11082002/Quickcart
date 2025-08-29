import connectDB from "@/config/db";
import Address from "@/models/Address";
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

    // connect to DB
    await connectDB();

    // ✅ fetch addresses for this user
    const addresses = await Address.find({ userId });

    return NextResponse.json(
      { success: true, addresses },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ API error in /api/user/get-address:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
