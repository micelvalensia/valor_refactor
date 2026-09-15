import { ProjectType } from "@/types/types"
import { useState } from "react"
import { usePostsQuery } from "./use-posts-query"

export const useHomeHook = () => {
    const [category, setCategory] = useState<ProjectType>("all")
    const { data: posts, isLoading, isError, refetch } = usePostsQuery(category)

    return { 
        category, 
        setCategory, 
        posts: posts ?? [], 
        isLoading, 
        isError, 
        refetch 
    }
}