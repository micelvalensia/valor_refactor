import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET() {
    const session = getServerSession()
    if(!session) {
        return Response.json({success: false, message: "Unauthrized"})
    }

    const users = await prisma.user.findMany({
        take: 5
    })

    return Response.json({data: users})
}