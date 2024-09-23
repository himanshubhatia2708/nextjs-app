import prisma from "@/lib/prisma";

export const dynamic = "force-static";

export async function GET() {
  try {
    const organizations = await prisma.organization.findMany({
      relationLoadStrategy: "join",
      include: {
        user: true,
      },
    } as any);
    return new Response(JSON.stringify(organizations), {
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
    const organization = await prisma.organization.create({
      data: req,
    });
    return new Response(
      JSON.stringify({
        success: true,
        data: organization,
      }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }
}
