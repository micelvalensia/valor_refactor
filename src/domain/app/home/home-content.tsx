"use client"

import { CategoryHome } from "./components/category-home";
import { ListContentHome } from "./components/list-content-home";
import { useHomeHook } from "./hooks/use-home-hook";

export function HomeContent() {
    const { category, setCategory } = useHomeHook()
    return (
        <div className="flex h-full min-h-0 flex-col gap-6 lg:gap-8 overflow-y-auto scrollbar-none pt-3 lg:pt-6">
            <CategoryHome category={category} setCategory={setCategory} />
            <ListContentHome />
        </div>
    )
}