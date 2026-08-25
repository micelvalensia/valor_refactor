import { Button } from "@/components/ui/button"
import { ProjectType } from "@/types/types"
import { FileCode, FolderOpenDotIcon, LucideIcon } from "lucide-react"

function CategoryButton({ active, label, onClick, Icon }: { label: string, onClick: () => void, active: boolean, Icon?: LucideIcon }) {
    return (
        <Button className={`${active ? "text-white bg-main" : "bg-[#232229] text-[#FFFFFF]/40 hover:bg-main/40 hover:text-[#FFFFFF]/60"} flex items-center justify-center gap-2 px-4 py-2 lg:px-8 lg:py-6 cursor-pointer text-xs lg:text-lg`} onClick={onClick}>
            {Icon && <Icon />}
            {label}
        </Button>
    )
}

const categoryButtonList = [{
    id: "all",
    label: "All",
}, {
    id: "problems",
    label: "Problems",
    Icon: FileCode
}, {
    id: "projects",
    label: "Projects",
    Icon: FolderOpenDotIcon
}]

export function CategoryHome({ category, setCategory }: { category: ProjectType, setCategory: (value: ProjectType) => void }) {
    return (
        <div className="flex items-center gap-3">
            {categoryButtonList.map((i) => {
                return (
                    <CategoryButton key={i.id} label={i.label} Icon={i.Icon} active={category === i.id} onClick={() => setCategory(i.id as ProjectType)} />
                )
            })}
        </div>
    )
}