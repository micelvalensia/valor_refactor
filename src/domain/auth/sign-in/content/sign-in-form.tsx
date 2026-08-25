"use client"

import { useSignIn } from "../hooks/use-sign-in";
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export function SignInForm() {
    const { form, onSubmit, isLoading } = useSignIn()
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className="w-full sm:max-w-md md:max-w-[80%] md:min-h-[80%] space-y-8 flex flex-col justify-center">
            <div className="flex flex-col space-y-6 text-center">
                <h1 className="text-white text-4xl md:text-5xl font-bold tracking-wider">
                    Welcome!
                </h1>
                <p className="text-white">Continue your <span className="text-main">dev journey</span></p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6 mt-10">
                <FieldGroup className="space-y-6">
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder=" "
                                        className="peer w-full bg-transparent border-0 border-b border-gray-600 rounded-none text-white placeholder:text-gray-500 focus:border-emerald-400 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-3 text-base md:text-xl"
                                    />

                                    <label
                                        htmlFor="email"
                                        className="pointer-events-none text-lg absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200
                                        peer-focus:-top-3
                                        peer-focus:-translate-y-1/2
                                        peer-focus:text-emerald-400
                                        peer-focus:text-lg
                                        peer-not-placeholder-shown:-top-3
                                        peer-not-placeholder-shown:-translate-y-1/2
                                        peer-not-placeholder-shown:text-lg"
                                    >
                                        Email
                                    </label>
                                </div>

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="relative">
                                <div className="relative">
                                    <Input
                                        {...field}
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        aria-invalid={fieldState.invalid}
                                        placeholder=" "
                                        className="peer w-full relative top-0 left-0 bg-transparent border-0 border-b border-gray-600 rounded-none text-white placeholder:text-gray-500 focus:border-emerald-400 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-3 text-base md:text-xl"
                                    />

                                    <label
                                        htmlFor="password"
                                        className="pointer-events-none text-lg absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200
                                        peer-focus:-top-3
                                        peer-focus:-translate-y-1/2
                                        peer-focus:text-emerald-400
                                        peer-focus:text-lg
                                        peer-not-placeholder-shown:-top-3
                                        peer-not-placeholder-shown:-translate-y-1/2
                                        peer-not-placeholder-shown:text-lg"
                                    >
                                        Password
                                    </label>

                                    {showPassword ? (
                                        <Eye
                                            onClick={() => setShowPassword(false)}
                                            className="text-slate-500 absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                                        />
                                    ) : (
                                        <EyeClosed
                                            onClick={() => setShowPassword(true)}
                                            className="text-slate-500 absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                                        />
                                    )}
                                </div>

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-main hover:bg-emerald-500 text-white font-bold py-6 rounded-lg text-base mt-8 transition-colors disabled:opacity-50"
                >
                    {isLoading ? "Loading..." : "Sign In"}
                </Button>
            </form>

            <p className="text-gray-400 text-sm mt-6">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-main hover:text-emerald-300 transition-colors">
                    Sign Up
                </Link>
            </p>
        </div>
    )
}