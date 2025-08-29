// import {serve} from "inngest/next"
// import {inngest, syncUserCreation, syncUserDeletion, syncUserUpdation} from '@/config/inngest'

// export const {GET,POST,PUT} =serve({
//     client:inngest,
//     functions: [
//  syncUserCreation, syncUserUpdation, syncUserDeletion
//     ],
// })

// app/api/inngest/route.js

import { serve } from "inngest/next";
import { inngest, syncUserCreation, syncUserUpdation, syncUserDeletion, createUserOrder } from "@/config/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUserCreation, syncUserUpdation, syncUserDeletion,createUserOrder],
});

console.log("🚀 Inngest route loaded: /api/inngest");