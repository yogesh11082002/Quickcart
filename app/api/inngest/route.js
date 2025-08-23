// import {serve} from "inngest/next"
// import {inngest, syncUserCreation, syncUserDeletion, syncUserUpdation} from '@/config/inngest'

// export const {GET,POST,PUT} =serve({
//     client:inngest,
//     functions: [
//  syncUserCreation, syncUserUpdation, syncUserDeletion
//     ],
// })

// app/api/inngest/route.js

export const runtime = "nodejs";   // 👈 Force Vercel to use Node.js serverless runtime

import { serve } from "inngest/next";
import { inngest, syncUserCreation, syncUserDeletion, syncUserUpdation } from "@/config/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUserCreation, syncUserUpdation, syncUserDeletion],
});
