
import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";
import Order from "@/models/Order";

export const inngest = new Inngest({
  id: "quickcart-next", // your app ID
  eventKey: process.env.INNGEST_EVENT_KEY,     // required for cloud
  signingKey: process.env.INNGEST_SIGNING_KEY, // required for cloud
});

// ✅ Log Inngest initialized
console.log("✅ Inngest initialized with app id:", "quickcart-next");

// ----------------------
// USER CREATION FUNCTION (with upsert)
// ----------------------
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      // Clerk sends full user data here
      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      if (!id || !email_addresses?.length) {
        console.error("❌ Missing required fields in Clerk event:", event.data);
        return;
      }

      const userData = {
        _id: id,
        email: email_addresses[0].email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        imageUrl: image_url, // ✅ matches schema
      };

      await connectDB();
      const newUser = await User.findByIdAndUpdate(
        id,
        userData,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      // Use JSON.stringify so URL isn’t truncated in logs
      console.log("✅ User created/updated in MongoDB:", JSON.stringify(newUser, null, 2));
    } catch (err) {
      console.error("❌ Error creating user:", err);
      throw err; // Let Inngest retry
    }
  }
);

// ----------------------
// USER UPDATE FUNCTION
// ----------------------
export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-with-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      if (!id) {
        console.error("❌ Missing user ID in update event:", event.data);
        return;
      }

      const userData = {
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        imageUrl: image_url, // ✅ matches schema
      };

      if (email_addresses?.[0]?.email_address) {
        userData.email = email_addresses[0].email_address;
      }

      await connectDB();
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: userData },
        { upsert: true, new: true }
      );

      console.log("✅ User updated in MongoDB:", JSON.stringify(updatedUser, null, 2));
    } catch (err) {
      console.error("❌ Error updating user:", err);
      throw err;
    }
  }
);

// ----------------------
// USER DELETION FUNCTION
// ----------------------
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      const { id } = event.data;

      if (!id) {
        console.error("❌ Missing user ID in delete event:", event.data);
        return;
      }

      await connectDB();
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        console.warn("⚠️ No user found to delete:", id);
      } else {
        console.log("✅ User deleted from MongoDB:", id);
      }
    } catch (err) {
      console.error("❌ Error deleting user:", err);
      throw err;
    }
  }
);

// Inngest function to create user's order in database

export const createUserOrder = inngest.createFunction({

     id:'create-user-order',
     batchEvents:{
      maxSize:25,
      timeout:'5s'
     }
},
{
  event:'order/created'
}, 
   async ({events})=>{

  const orders =events.map((event)=>{
    return {
      userId: event.data.userId,
      items:event.data.items,
      amount:event.data.amount,
      address:event.data.address,
      date:event.data.date
    }
  })

await connectDB()
await  Order.insertMany(orders)

return {success:true , processed : orders.length};
}
)