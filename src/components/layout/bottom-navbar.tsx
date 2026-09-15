"use client"

import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ChevronUp, LogOut, User } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useCurrentUser } from "@/hooks/use-current-user"

export function BottomNavbar() {
    const { data: sessionData, status } = useSession()
    const { data: queryUser, isLoading: queryLoading, isFetching: queryFetching } = useCurrentUser()
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const user = queryUser || sessionData?.user
    const isLoading = queryLoading && status === "loading"

    console.log("[BOTTOM NAVBAR RENDER]", {
        sessionUserName: sessionData?.user?.name || null,
        nextAuthStatus: status,
        queryUserName: queryUser?.name || null,
        queryLoading,
        queryFetching,
        resolvedUser: user?.name || null,
        finalIsLoading: isLoading,
    })

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
            document.addEventListener("keydown", handleKeyDown)
            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
                document.removeEventListener("keydown", handleKeyDown)
            }
        }
    }, [isOpen])

    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U"

    return (
        <div className="relative w-full" ref={menuRef}>
            {/* Popover Menu */}
            {isOpen && (
                <div className="absolute bottom-full mb-2 left-0 right-0 z-50 rounded-xl border border-white/10 bg-[#1e1d24] p-1.5 shadow-2xl shadow-black/80 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-150">
                    {/* User Info Header */}
                    <div className="px-3 py-2.5 border-b border-white/10 mb-1">
                        <p className="text-[11px] font-medium uppercase tracking-wider text-white/40">Akun Anda</p>
                        <p className="text-sm font-semibold text-white truncate mt-0.5">{user?.name || "User"}</p>
                        <p className="text-xs text-white/50 truncate">{user?.email || ""}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="flex flex-col gap-0.5">
                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <User className="size-4 text-white/60" />
                            <span>Lihat Profile</span>
                        </Link>

                        <button
                            onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer text-left"
                        >
                            <LogOut className="size-4 text-rose-400" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Bottom Bar Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full p-3 flex items-center justify-between rounded-xl hover:bg-white/5 transition-colors cursor-pointer text-left"
            >
                <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="size-9 border border-white/10">
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt={user?.name || "User Avatar"}
                            className="grayscale"
                        />
                        <AvatarFallback className="bg-main/20 text-main font-semibold">
                            {userInitial}
                        </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate leading-tight">
                            {user?.name || (isLoading ? "Loading..." : "Guest")}
                        </p>
                        <p className="text-xs text-white/40 truncate leading-tight mt-0.5">
                            {user?.email || ""}
                        </p>
                    </div>
                </div>

                <div className={`text-white/60 transition-transform duration-200 ${isOpen ? "rotate-180 text-white" : ""}`}>
                    <ChevronUp className="size-5" />
                </div>
            </button>
        </div>
    )
}