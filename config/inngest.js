
// import { Inngest } from "inngest";
// import connectDB from "./db";
// import User from "@/models/User";

// export const inngest = new Inngest({
//   id: "quickcart-next", // your app ID
//   eventKey: process.env.INNGEST_EVENT_KEY,     // required for cloud
//   signingKey: process.env.INNGEST_SIGNING_KEY, // required for cloud
// });

// // ✅ Log Inngest initialized
// console.log("✅ Inngest initialized with app id:", "quickcart-next");

// // ----------------------
// // USER CREATION FUNCTION (with upsert)
// // ----------------------
// export const syncUserCreation = inngest.createFunction(
//   { id: "sync-user-from-clerk" },
//   { event: "clerk/user.created" },
//   async ({ event }) => {
//     try {
//       console.log("📩 Received Clerk User Created Event:", event.data);

//       const { id, first_name, last_name, email_addresses, image_url } = event.data;
//       if (!id || !email_addresses?.length) {
//         console.error("❌ Missing required fields in Clerk event:", event.data);
//         return;
//       }

//       const userData = {
//         _id: id,
//         email: email_addresses[0].email_address,
//         name: `${first_name || ""} ${last_name || ""}`.trim(),
//         imageUrl: image_url,
//       };

//       await connectDB();
//       const newUser = await User.findByIdAndUpdate(
//         id,
//         userData,
//         { upsert: true, new: true, setDefaultsOnInsert: true }
//       );

//       console.log("✅ User created/updated in MongoDB:", newUser);
//     } catch (err) {
//       console.error("❌ Error creating user:", err);
//       throw err; // Let Inngest retry
//     }
//   }
// );

// // ----------------------
// // USER UPDATE FUNCTION (with safe email update)
// // ----------------------
// export const syncUserUpdation = inngest.createFunction(
//   { id: "update-user-with-clerk" },
//   { event: "clerk/user.updated" },
//   async ({ event }) => {
//     try {
//       console.log("📩 Received Clerk User Updated Event:", event.data);

//       const { id, first_name, last_name, email_addresses, image_url } = event.data;
//       if (!id) {
//         console.error("❌ Missing user ID in update event:", event.data);
//         return;
//       }

//       const userData = {
//         name: `${first_name || ""} ${last_name || ""}`.trim(),
//         imageUrl: image_url,
//       };

//       // only update email if present
//       if (email_addresses?.[0]?.email_address) {
//         userData.email = email_addresses[0].email_address;
//       }

//       await connectDB();
//       const updatedUser = await User.findByIdAndUpdate(
//         id,
//         { $set: userData },
//         { upsert: true, new: true } // ensures user is created if missing
//       );

//       console.log("✅ User updated in MongoDB:", updatedUser);
//     } catch (err) {
//       console.error("❌ Error updating user:", err);
//       throw err;
//     }
//   }
// );

// // ----------------------
// // USER DELETION FUNCTION
// // ----------------------
// export const syncUserDeletion = inngest.createFunction(
//   { id: "delete-user-with-clerk" },
//   { event: "clerk/user.deleted" },
//   async ({ event }) => {
//     try {
//       console.log("📩 Received Clerk User Deleted Event:", event.data);

//       const { id } = event.data;
//       if (!id) {
//         console.error("❌ Missing user ID in delete event:", event.data);
//         return;
//       }

//       await connectDB();
//       const deletedUser = await User.findByIdAndDelete(id);

//       if (!deletedUser) {
//         console.warn("⚠️ No user found to delete:", id);
//       } else {
//         console.log("✅ User deleted from MongoDB:", id);
//       }
//     } catch (err) {
//       console.error("❌ Error deleting user:", err);
//       throw err;
//     }
//   }
// );

import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

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
      console.log("📩 Received Clerk User Created Event:", event.data);

      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      if (!id || !email_addresses?.length) {
        console.error("❌ Missing required fields in Clerk event:", event.data);
        return;
      }

      const userData = {
        _id: id,
        email: email_addresses[0].email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        imageUrl: image_url, // ✅ fixed field
      };

      await connectDB();
      const newUser = await User.findByIdAndUpdate(
        id,
        userData,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log("✅ User created/updated in MongoDB:", newUser);
    } catch (err) {
      console.error("❌ Error creating user:", err);
      throw err; // Let Inngest retry
    }
  }
);

// ----------------------
// USER UPDATE FUNCTION (with safe email update)
// ----------------------
export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-with-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    try {
      console.log("📩 Received Clerk User Updated Event:", event.data);

      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      if (!id) {
        console.error("❌ Missing user ID in update event:", event.data);
        return;
      }

      const userData = {
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        imageUrl: image_url, // ✅ fixed field
      };

      // only update email if present
      if (email_addresses?.[0]?.email_address) {
        userData.email = email_addresses[0].email_address;
      }

      await connectDB();
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: userData },
        { upsert: true, new: true }
      );

      console.log("✅ User updated in MongoDB:", updatedUser);
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
      console.log("📩 Received Clerk User Deleted Event:", event.data);

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
