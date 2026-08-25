import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../service/register-service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useRegisterAccount() {
  const router = useRouter();

  return useMutation({
    mutationKey: ["register-account"],
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
}