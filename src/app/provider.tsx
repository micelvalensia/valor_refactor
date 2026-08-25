"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React from "react";

export const Provider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient()

    return (
        <SessionProvider refetchOnWindowFocus={true} refetchWhenOffline={false} refetchInterval={60}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SessionProvider>
    )
}