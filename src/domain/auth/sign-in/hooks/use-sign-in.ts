import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema, SignInSchema } from "../schema/sign-in-schema"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { useState } from "react"

export const useSignIn = () => {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = form.handleSubmit(async (data) => {
        try {
            setIsLoading(true)
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            console.log(result)

            if (result?.ok) {
                toast.success("Login berhasil!")
                window.location.href = "/home"
            } else if (result?.error) {
                toast.error("Email atau password salah")
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat login")
        } finally {
            setIsLoading(false)
        }
    })

    return { form, onSubmit, isLoading }
}