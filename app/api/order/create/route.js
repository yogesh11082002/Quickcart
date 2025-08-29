

// import { inngest } from "@/config/inngest";
// import Product from "@/models/Product";
// import User from "@/models/User";
// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const { userId } = getAuth(request);

//     if (!userId) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized: No user ID" },
//         { status: 401 }
//       );
//     }

//     const { address, items } = await request.json();

//     if (!address || !items || items.length === 0) {
//       return NextResponse.json(
//         { success: false, message: "Invalid Data" },
//         { status: 400 }
//       );
//     }

//     // ✅ Calculate total amount
//     let amount = 0;
//     for (const item of items) {
//       const product = await Product.findById(item.productId); // match frontend
//       if (!product) {
//         return NextResponse.json(
//           { success: false, message: `Product not found: ${item.productId}` },
//           { status: 404 }
//         );
//       }
//       amount += product.offerPrice * item.quantity;
//     }

//     // ✅ Send order event
//     await inngest.send({
//       name: "order/created",
//       data: {
//         userId,
//         address,
//         items,
//         amount: amount + Math.floor(amount * 0.02), // add fee
//         date: Date.now(),
//       },
//     });

//     // ✅ Clear user cart (if you store cart by Clerk ID, not Mongo _id)
//     const user = await User.findOne({ clerkId: userId }); // safer than findById
//     if (user) {
//       user.cartItems = {};
//       await user.save();
//     }

//     return NextResponse.json({ success: true, message: "Order Placed" });
//   } catch (error) {
//     console.error("API error:", error);
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }
import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import User from "@/models/User";
import Order from "@/models/Order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function POST(request) {
  try {
    await dbConnect();

    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No user ID" },
        { status: 401 }
      );
    }

    const { address, items } = await request.json();

    if (!address || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid Data" },
        { status: 400 }
      );
    }

    // ✅ Calculate total amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return NextResponse.json(
          { success: false, message: `Product not found: ${item.productId}` },
          { status: 404 }
        );
      }
      amount += product.offerPrice * item.quantity;
    }

    amount = amount + Math.floor(amount * 0.02);

    // ✅ Save order to MongoDB
    const newOrder = await Order.create({
      userId, // Clerk ID (string)
      address,
      items: items.map((item) => ({
        productId: item.productId, // ObjectId
        quantity: item.quantity,
      })),
      amount,
      status: "Order Placed",
    });

    // ✅ Send event to Inngest
    await inngest.send({
      name: "order/created",
      data: {
        orderId: newOrder._id.toString(),
        userId,
        address,
        items,
        amount,
        date: newOrder.date,
      },
    });

    // ✅ Clear user cart
    const user = await User.findOne({ clerkId: userId });
    if (user) {
      user.cartItems = {};
      await user.save();
    }

    return NextResponse.json({
      success: true,
      message: "Order Placed",
      order: newOrder,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
