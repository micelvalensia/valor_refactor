"use client"

import { Header } from "@/components/layout/header"
import { MobileBar } from "@/components/layout/mobile-bar"
import { MobileHeader } from "@/components/layout/movile-header"
import { Sidebar } from "@/components/layout/sidebar"
import { LoadingFull } from "@/components/ui/loading-full"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { status, data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/auth/sign-in")
        }
    }, [status, router])

    if (status === "loading") {
        return <LoadingFull />
    }

    if (status === "unauthenticated") {
        return null
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