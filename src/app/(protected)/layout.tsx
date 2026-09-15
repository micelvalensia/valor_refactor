"use client"
import { Header } from "@/components/layout/header"
import { MobileBar } from "@/components/layout/mobile-bar"
import { MobileHeader } from "@/components/layout/movile-header"
import { Sidebar } from "@/components/layout/sidebar"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PropsWithChildren } from "react"

const NoLayout = ({ children }: PropsWithChildren) => {
    const pathname = usePathname()

    // Parse URL to determine back link destination and title
    const backHref = pathname === "/create-post" ? "/home" : "/create-post"
    
    let title = "Create Post"
    if (pathname?.includes("/problem")) {
        title = "Create Problem"
    } else if (pathname?.includes("/project")) {
        title = "Create Project"
    }

    return (
        <div className="w-full space-y-4">
            <div className="w-full p-6 border-b border-white/10 text-white">
                <div className="max-w-6xl relative mx-auto flex items-center justify-center">
                    <Link
                        href={backHref}
                        className="absolute left-0 flex items-center gap-1 cursor-pointer hover:text-main transition-colors text-white"
                    >
                        <ArrowLeftIcon size={20} />
                        <span>back</span>
                    </Link>
                    <p className="text-center font-semibold text-2xl">{title}</p>
                </div>
            </div>
            <div className="max-w-6xl mx-auto">
                {children}
            </div>
        </div>
    )
}

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    console.log("[PROTECTED LAYOUT RENDER] pathname:", pathname)
    if (pathname?.startsWith("/create-post")) {
        return <NoLayout children={children} />
    }
    return (
        <div className="flex h-dvh lg:h-screen flex-col overflow-hidden bg-background">
            {/* Header */}
            <MobileHeader />
            <Header />

            {/* Content area */}
            <div className="flex min-h-0 flex-1">
                <Sidebar />

                <main className="min-h-0 flex-1 px-3">
                    <div className="container mx-auto h-full min-h-0">
                        {children}
                    </div>
                </main>
            </div>
            <MobileBar />
        </div>
    )
}