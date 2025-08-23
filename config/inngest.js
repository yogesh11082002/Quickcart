// import { Inngest } from "inngest";
// import connectDB from "./db";
// import User from "@/models/User";

// export const inngest = new Inngest({id:'quickcart-next'})

// // inngest  function to save user data

// export const syncUserCreation = inngest.createFunction(
//     {
//         id:'sync-user-from-clerk'
//     },
//     {
//         event:"clerk/user.created"
//     },
//     async({event})=>{
//         const{id,first_name,last_name,email_addresses ,image_url}=event.data
//         const userData={
//             _id:id,
//             email:email_addresses[0].email_address ,
//             name: first_name +""+ last_name,
//            imageurl: image_url

//         }
//         await connectDB()
//             await User.create(userData)
        
//     }

// )
// export const syncUserUpdation = inngest.createFunction(
//     {
//         id: 'update-user-with-clerk'
//     },
//     {
//         event: "clerk/user.updated"
//     },
//     async ({ event }) => {
//         const { id, first_name, last_name, email_addresses, image_url } = event.data
//         const userData = {
//             email: email_addresses[0].email_address,
//             name: first_name + " " + last_name,
//             imageurl: image_url
//         }
//         await connectDB()
//         await User.findByIdAndUpdate(id, userData)
//     }
// )

// export const syncUserDeletion = inngest.createFunction(
//     {
//         id: 'delete-user-with-clerk'
//     },
//     {
//         event: "clerk/user.deleted"
//     },
//     async ({ event }) => {
//         const { id } = event.data
//         await connectDB()
//         await User.findByIdAndDelete(id)
//     }
// )

import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

export const inngest = new Inngest({
  id: "quickcart-next", // your app ID (can be any string, stays the same)
  eventKey: process.env.INNGEST_EVENT_KEY,     // required for cloud
  signingKey: process.env.INNGEST_SIGNING_KEY, // required for cloud
});

// ✅ Log Inngest initialized
console.log("✅ Inngest initialized with app id:", "quickcart-next");

// ----------------------
// USER CREATION FUNCTION
// ----------------------
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    console.log("📩 Received Clerk User Created Event:", event.data);

    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses?.[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      imageurl: image_url,
    };

    console.log("📝 Saving new user to DB:", userData);

    await connectDB();
    await User.create(userData);

    console.log("✅ User created in MongoDB:", id);
  }
);

// ----------------------
// USER UPDATE FUNCTION
// ----------------------
export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-with-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    console.log("📩 Received Clerk User Updated Event:", event.data);

    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      email: email_addresses?.[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      imageurl: image_url,
    };

    console.log("📝 Updating user in DB:", { id, ...userData });

    await connectDB();
    await User.findByIdAndUpdate(id, userData);

    console.log("✅ User updated in MongoDB:", id);
  }
);

// ----------------------
// USER DELETION FUNCTION
// ----------------------
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    console.log("📩 Received Clerk User Deleted Event:", event.data);

    const { id } = event.data;

    console.log("🗑️ Deleting user from DB:", id);

    await connectDB();
    await User.findByIdAndDelete(id);

    console.log("✅ User deleted from MongoDB:", id);
  }
);
