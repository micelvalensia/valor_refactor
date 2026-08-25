import { BookMarked, Home, Projector, Scroll, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BottomNavbar } from "./bottom-navbar"

const sidebarMenu = [{
    title: "Home",
    icon: Home,
    href: "/home"
}, {
    title: "Problems",
    icon: Scroll,
    href: "/problems"
}, {
    title: "Projects",
    icon: Projector,
    href: "/projects"
}, {
    title: "Trending",
    icon: TrendingUp,
    href: "/trending"
}, {
    title: "Leaderboard",
    icon: BookMarked,
    href: "/leaderboard"
}, {
    title: "Community",
    icon: Users,
    href: "/community"
}]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="bg-[#232229] w-75 hidden lg:flex flex-col h-[90.5vh] border-r border-white/20 p-2 px-4 relative">
            <div className="w-full mt-4 flex flex-col gap-3 flex-1">
                {sidebarMenu.map((sm) => (
                    <Link href={`${sm.href}`} className={`text-muted/40 flex items-center gap-4 ${pathname === sm.href ? "bg-main/50" : "hover:bg-main/20"} px-4 py-3 rounded-lg`} key={sm.href}>
                        <sm.icon className={`${pathname === sm.href ? "text-main" : ""} rounded-full p-1`} size={"2rem"} />
                        <span className={`text-lg font-semibold ${pathname === sm.href ? "text-main" : ""}`}>
                            {sm.title}
                        </span>
                    </Link>
                ))}
            </div>
            <div className="mt-auto">
                <BottomNavbar />
            </div>
        </div>
    )
}