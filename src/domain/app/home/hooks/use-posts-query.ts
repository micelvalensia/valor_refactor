import { useQuery } from "@tanstack/react-query";
import { fetchPosts, PostItem } from "../service/home-service";
import { ProjectType } from "@/types/types";

export const usePostsQuery = (category: ProjectType) => {
  return useQuery<PostItem[]>({
    queryKey: ["posts", category],
    queryFn: () => fetchPosts(category),
    staleTime: 10 * 1000,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
  });
};
