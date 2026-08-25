import { BookMarked, Home, TrendingUp, User, Users } from "lucide-react"
import { usePathname } from "next/navigation"

const mobileBarMenu = [{
    icon: Home,
    href: "/home"
}, {
    icon: TrendingUp,
    href: "/trending"
}, {
    icon: BookMarked,
    href: "/leaderboard"
}, {
    icon: Users,
    href: "/community"
}, {
    icon: User,
    href: "/profile"
}]

export function MobileBar() {
    const pathname = usePathname()
    return (
        <div className="border-t border-border/50 flex lg:hidden p-4">
            <div className="grid grid-cols-5 items-center justify-center gap-4 w-full">
                {mobileBarMenu.map((mb) => (
                    <div key={mb.href} className="text-white w-full flex items-center justify-center">
                        <div className={`${pathname === mb.href ? "bg-main rounded-full p-2" : ""}`}>
                            <mb.icon size={30} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}