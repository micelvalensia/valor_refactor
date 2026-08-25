"use client"

import { signOut } from "next-auth/react";

export function SignOutButton() {
    return (
        <button onClick={() => signOut()} className="bg-blue-600">Sign out</button>
    )
}