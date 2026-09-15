import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const typeParam = searchParams.get("type"); // "all" | "problems" | "projects"

    let whereClause = {};
    if (typeParam === "problems") {
      whereClause = { type: "problem" };
    } else if (typeParam === "projects") {
      whereClause = { type: "project" };
    }

    const posts = await prisma.post.findMany({
      where: whereClause,
      orderBy: {
        created_at: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            description: true,
            exp: true,
            level: {
              select: {
                level_number: true,
                title: true,
              },
            },
          },
        },
        project: true,
        problem: true,
        stacks: {
          include: {
            stack: true,
          },
        },
        images: true,
        ratings: {
          select: {
            score: true,
            user_id: true,
          },
        },
        _count: {
          select: {
            comments: true,
            ratings: true,
          },
        },
      },
    });

    const formattedPosts = posts.map((post) => {
      const totalRating = post.ratings.reduce((acc, curr) => acc + curr.score, 0);
      const avgRating = post.ratings.length > 0 ? Number((totalRating / post.ratings.length).toFixed(1)) : 0;

      return {
        id: post.id,
        type: post.type,
        created_at: post.created_at,
        user: post.user,
        project: post.project,
        problem: post.problem,
        stacks: post.stacks.map((s) => s.stack),
        images: post.images,
        comments_count: post._count.comments,
        ratings_count: post._count.ratings,
        rating_avg: avgRating,
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedPosts,
    });
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch posts",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
