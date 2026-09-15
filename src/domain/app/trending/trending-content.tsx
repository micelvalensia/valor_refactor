import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

const dummyList: {
    rank: number,
    content: string
}[] = [
        {
            rank: 1,
            content: "#problemsolving",
        },
        {
            rank: 2,
            content: "#projectideas"
        },
        {
            rank: 3,
            content: "#programminglanguage"
        },
        {
            rank: 4,
            content: "#machinelearning"
        },
        {
            rank: 5,
            content: "#aislop"
        }
    ]

export function TrendingContent() {
    return (
        <div className="space-y-6 pt-3 lg:pt-6">
            <div className="md:hidden relative">
                <Search size={20} className="absolute left-3 text-slate-50/10 top-1/2 -translate-y-1/2" />
                <Input className="border border-slate-50/10 focus-visible:ring-0 p-5 pl-10 text-white bg-[#232229] rounded-sm" placeholder="Search..." />
            </div>
            <div className="flex flex-col items-start gap-10">
                {dummyList.map((item) => (
                    <div className="flex flex-col gap-4" key={item.rank}>
                        <span className="text-[#FFFFFF]/40 text-lg">{item.rank}. Trending</span>
                        <Link href={`/${item.content}`} className="text-white text-3xl font-semibold">{item.content}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}