"use client"

import { LoadingFull } from "@/components/ui/loading-full";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated") {
      router.replace("/auth/sign-in")
    } else if (status === "authenticated") {
      router.replace("/home")
    }
  }, [status, router])

  return <LoadingFull />
}
