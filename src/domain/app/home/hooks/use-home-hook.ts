import { ProjectType } from "@/types/types"
import { useState } from "react"

export const useHomeHook = () => {
    const [category, setCategory] = useState<ProjectType>("all")

    return { category, setCategory }
}