"use client"

import { signIn } from "next-auth/react";

export default function PublicPage() {
    return (
        <>
            <h1>You can access this page</h1>
            <button onClick={() => signIn()}>Signin</button>
        </>
    )
}