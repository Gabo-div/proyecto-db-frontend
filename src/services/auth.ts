import { userSchema } from "@/models/user";
import { axiosInstance } from "@/utils/axiosServer";
import { z } from "zod";

const loginReturnSchema = z.object({
  user: userSchema,
  token: z.string(),
});

type LoginReturn = z.infer<typeof loginReturnSchema>;

export const login = async (params: {
  username: string;
  password: string;
}): Promise<LoginReturn | null> => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username: params.username,
      password: params.password,
    });

    return loginReturnSchema.parse(response.data);
  } catch (error) {
    return null;
  }
};
