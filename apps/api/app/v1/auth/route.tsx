import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const req = await request.json();
        const user = await prisma.user.findUnique({
            /* relationLoadStrategy: 'join', // or 'query' */
            /* include: {
                user_role: {
                    select: {
                        roleId: true
                    }
                },
            }, */
            where: {
                email: req.email,
                password: req.password
            },
        } as any);
        if (user) {
            return new Response(JSON.stringify({
                success: true,
                data: user
            }), {
                status: 200,
            });
        } else {
            throw new Error("User does not exist");
        }
    } catch (error: any) {
        return new Response(`Webhook error: ${error.message}`, {
            status: 400,
        })
    }
}