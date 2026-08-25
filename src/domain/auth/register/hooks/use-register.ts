import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "../schema/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../service/register-service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useResgister = () => {
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/auth/sign-in");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Registrasi gagal";
      toast.error(message);
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return { form, onSubmit, isLoading: mutation.isPending };
};