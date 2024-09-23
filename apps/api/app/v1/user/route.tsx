import prisma from "@/lib/prisma";

export const dynamic = "force-static";
/* export const fetchCache = "force-no-store";
export const revalidate = 0; */

export async function GET() {
  try {
    // Process the webhook payload
    const data = await prisma.user.findMany();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }
}

export async function POST(request: Request) {
  try {
    const req = await request.json();

    const user = await prisma.user.create({
      data: req,
    });
    return new Response(JSON.stringify(user), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        /* 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization', */
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error: any) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }
}
