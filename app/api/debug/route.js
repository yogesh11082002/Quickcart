export async function GET() {
  return Response.json({
    INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY ? "✅ Loaded" : "❌ Missing",
    INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY ? "✅ Loaded" : "❌ Missing",
  });
}
