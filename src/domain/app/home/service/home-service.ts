import api from "@/lib/api";
import { ProjectType } from "@/types/types";

export interface PostStackItem {
  id: string;
  title: string;
}

export interface PostUser {
  id: string;
  username: string;
  description: string | null;
  exp: number;
  level: {
    level_number: number;
    title: string;
  } | null;
}

export interface PostProjectData {
  id: string;
  title: string;
  description: string;
  demo_url: string | null;
  repository_url: string | null;
}

export interface PostProblemData {
  id: string;
  title: string;
  description: string;
}

export interface PostImageItem {
  id: string;
  image_url: string;
  image_size: string;
}

export interface PostItem {
  id: string;
  type: "project" | "problem";
  created_at: string;
  user: PostUser;
  project: PostProjectData | null;
  problem: PostProblemData | null;
  stacks: PostStackItem[];
  images: PostImageItem[];
  comments_count: number;
  ratings_count: number;
  rating_avg: number;
}

export interface PostsResponse {
  success: boolean;
  data: PostItem[];
  message?: string;
}

export const fetchPosts = async (type: ProjectType = "all"): Promise<PostItem[]> => {
  console.log("[fetchPosts START] requesting /posts with type:", type);
  try {
    const response = await api.get<PostsResponse>("/posts", {
      params: { type },
    });
    console.log("[fetchPosts SUCCESS] received items count:", response.data.data?.length);
    return response.data.data;
  } catch (err) {
    console.error("[fetchPosts ERROR]", err);
    throw err;
  }
};
