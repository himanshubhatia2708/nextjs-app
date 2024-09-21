import prisma from "@/lib/prisma";

export const dynamic = "force-static";

export async function GET() {
  try {
    // Process the webhook payload
    const data = await prisma.organization.findMany();
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

export async function PUT(request: Request) {
  try {
    const { id } = request;
    const req = await request.json();
    const organization = await prisma.organization.update({
      where: { id: Number(id) },
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

export async function DELETE(request: Request) {
  try {
    const { id } = request;
    const organization = await prisma.organization.delete({
      where: {
        id: Number(id),
      },
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
