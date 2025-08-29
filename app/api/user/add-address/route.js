import connectDB from "@/config/db";
import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // ✅ Get Clerk userId from request
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No user ID" },
        { status: 401 }
      );
    }

    // ✅ Parse request body safely
    const body = await req.json();
    if (!body || !body.address) {
      return NextResponse.json(
        { success: false, message: "Address data missing" },
        { status: 400 }
      );
    }

    // ✅ Connect to DB
    await connectDB();

    // ✅ Create new Address linked to the Clerk user
    const newAddress = await Address.create({
      ...body.address,
      userId,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Address added successfully",
        address: newAddress,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
