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
//     const{ address , items} = await request.json();

//     if (!address || items.length===0) {
//         return NextResponse.json(
//       { success: false, message: 'Invalid Data' }
//         )
//     }

//    const amount = await items.reduce(async(acc, item) =>{
//     const product = await Product.findById(item.product);
//     return acc + product.offerPrice * item.quantity
//    },0)

//    await inngest.send({
//     name:'order/created',
//     data: {
//       userId,
//       address,
//       items,
//       amount:amount + Math.floor(amount*0.02),
//       date: Date.now()
//     }
//    })
//  // clear user chart

//  const  user = await User.findById(userId);
//  user.cartItems = {};
//  await user.save();

//     return NextResponse.json({ success: true, message:'Order Placed' });

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
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
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
      const product = await Product.findById(item.productId); // match frontend
      if (!product) {
        return NextResponse.json(
          { success: false, message: `Product not found: ${item.productId}` },
          { status: 404 }
        );
      }
      amount += product.offerPrice * item.quantity;
    }

    // ✅ Send order event
    await inngest.send({
      name: "order/created",
      data: {
        userId,
        address,
        items,
        amount: amount + Math.floor(amount * 0.02), // add fee
        date: Date.now(),
      },
    });

    // ✅ Clear user cart (if you store cart by Clerk ID, not Mongo _id)
    const user = await User.findOne({ clerkId: userId }); // safer than findById
    if (user) {
      user.cartItems = {};
      await user.save();
    }

    return NextResponse.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
