"use client"

import { useQuery } from "@tanstack/react-query"

export function useCurrentUser() {
    return useQuery({
        queryKey: ["current-user-session"],
        queryFn: async () => {
            console.log("[useCurrentUser queryFn START] fetching /api/auth/session at", window.location.pathname)
            try {
                const res = await fetch("/api/auth/session", {
                    cache: "no-store",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                console.log("[useCurrentUser fetch response status]", res.status, res.ok)
                if (!res.ok) return null
                const data = await res.json()
                console.log("[useCurrentUser session data resolved]", data?.user?.name || "(no user in session payload)")
                return data?.user ?? null
            } catch (err) {
                console.error("[useCurrentUser queryFn CATCH ERROR]", err)
                return null
            }
        },
        staleTime: 10 * 1000,
        refetchOnMount: "always",
        refetchOnWindowFocus: "always",
        refetchOnReconnect: "always",
    })
}
