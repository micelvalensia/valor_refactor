import { authOptions } from "@/lib/auth"
import NextAuth from "next-auth"
import { NextRequest, NextResponse } from "next/server"

const nextAuthHandler = NextAuth(authOptions)

export async function GET(req: NextRequest, ctx: any) {
  console.log("[SERVER NEXTAUTH GET ROUTE]", req.url)
  return nextAuthHandler(req, ctx)
}

export async function POST(req: NextRequest, ctx: any) {
  console.log("[SERVER NEXTAUTH POST ROUTE]", req.url)
  return nextAuthHandler(req, ctx)
}