import { coordinatorSchema } from "@/models/coordinator";
import { axiosInstance } from "@/utils/axiosServer";

export const getCurrentCoordinator = async () => {
  try {
    const response = await axiosInstance.get("/coordinators/me");

    return coordinatorSchema.parse(response.data);
  } catch (error) {
    return null;
  }
};
