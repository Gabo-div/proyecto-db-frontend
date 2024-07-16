import { periodSchema } from "@/models/period";
import { axiosInstance } from "@/utils/axiosServer";

export const getAllPeriods = async () => {
  try {
    const response = await axiosInstance.get("/periods");

    return periodSchema.array().parse(response.data);
  } catch (error) {
    return [];
  }
};
