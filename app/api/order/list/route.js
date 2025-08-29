
// import connectDB from "@/config/db";
// import Order from "@/models/Order";
// import Product from "@/models/Product";
// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export async function GET(request) {
//   try {
//     const { userId } = getAuth(request);

//     if (!userId) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized: No user ID" },
//         { status: 401 }
//       );
//     }

//     await connectDB();

//     // ✅ populate items.productId (not items.product)
//     const orders = await Order.find({ userId })
//       .populate("items.productId") // get product details
//       .sort({ date: -1 });

//     return NextResponse.json({ success: true, orders });
//   } catch (error) {
//     console.error("API error:", error);
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }

import connectDB from "@/config/db";
import Order from "@/models/Order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No user ID" },
        { status: 401 }
      );
    }

    await connectDB();

    // ✅ Populate both products & address
    const orders = await Order.find({ userId })
      .populate({
        path: "items.productId",
        model: "Product",
        select: "name image price", // only needed fields
      })
      .populate({
        path: "address",
        model: "Address",
        select: "fullName area city state phoneNumber",
      })
      .sort({ date: -1 });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
