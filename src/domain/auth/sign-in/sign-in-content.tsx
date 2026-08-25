"use client"

import { BaseAuth } from "../shared/base-auth";
import { SignInForm } from "./content/sign-in-form";

export function SignInContent() {
    return (
        <div>
            <BaseAuth children={<SignInForm />} direction="left" type="login" />
        </div>
    )
}