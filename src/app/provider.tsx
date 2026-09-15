"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import React, { useEffect, useState } from "react";

function HistoryNavigationSync({ queryClient }: { queryClient: QueryClient }) {
    useEffect(() => {
        const handlePageShow = (event: PageTransitionEvent) => {
            console.log("[CLIENT EVENT pageshow]", {
                persisted: event.persisted,
                pathname: window.location.pathname,
            })
            if (event.persisted) {
                console.log("[CLIENT BFCache restore detected -> triggering reload]")
                window.location.reload()
            } else {
                console.log("[CLIENT pageshow -> refetching active queries]")
                queryClient.refetchQueries({ type: "active" })
            }
        }

        const handlePopState = (event: PopStateEvent) => {
            console.log("[CLIENT EVENT popstate]", {
                pathname: window.location.pathname,
                state: event.state,
            })
            queryClient.refetchQueries({ type: "active" })
        }

        try {
            const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[]
            console.log("[CLIENT NAVIGATION TYPE]", navEntries[0]?.type, "pathname:", window.location.pathname)
            if (navEntries.length > 0 && navEntries[0].type === "back_forward") {
                console.log("[CLIENT navigation back_forward detected -> refetching active queries]")
                queryClient.refetchQueries({ type: "active" })
            }
        } catch (err) {
            console.error("[CLIENT Performance navigation error]", err)
        }

        window.addEventListener("pageshow", handlePageShow)
        window.addEventListener("popstate", handlePopState)

        return () => {
            window.removeEventListener("pageshow", handlePageShow)
            window.removeEventListener("popstate", handlePopState)
        }
    }, [queryClient])

    return null
}

export const Provider = ({
    children,
    session,
}: {
    children: React.ReactNode;
    session?: Session | null;
}) => {
    console.log("[CLIENT PROVIDER RENDER] initial session prop:", session?.user?.name || "(no session prop)")

    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 10 * 1000,
                refetchOnWindowFocus: "always",
                refetchOnReconnect: "always",
                retry: 1,
            },
        },
    }))

    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <HistoryNavigationSync queryClient={queryClient} />
                {children}
            </QueryClientProvider>
        </SessionProvider>
    )
}