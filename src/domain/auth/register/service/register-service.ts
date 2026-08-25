import api from "@/lib/api";
import { RegisterSchema } from "../schema/register-schema";

export interface RegisterResponse {
  message: string;
  user?: {
    id: number;
    email: string;
    username: string;
    created_at: string;
  };
}

export const registerUser = async (data: RegisterSchema): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>("/auth/register", data);
  return response.data;
};
