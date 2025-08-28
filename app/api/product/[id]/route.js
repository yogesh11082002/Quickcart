import connectDB from "@/config/db";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// ✅ DELETE product
export async function DELETE(request, { params }) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const product = await Product.findOne({ _id: params.id, sellerId: userId });

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found or not yours" }, { status: 404 });
    }

    await Product.deleteOne({ _id: params.id, sellerId: userId });

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// ✅ UPDATE product
export async function PUT(request, { params }) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, category, offerPrice, image } = body;

    await connectDB();
    const product = await Product.findOneAndUpdate(
      { _id: params.id, sellerId: userId },
      { name, category, offerPrice, image },
      { new: true }
    );

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found or not yours" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
