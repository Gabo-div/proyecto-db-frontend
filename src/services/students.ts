import { studentSchema } from "@/models/student";
import { axiosInstance } from "@/utils/axiosServer";

export const getAllStudents = async () => {
  try {
    const response = await axiosInstance.get("/students");

    return studentSchema.array().parse(response.data);
  } catch (error) {
    return [];
  }
};
