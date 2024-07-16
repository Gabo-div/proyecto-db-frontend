import { courseSchema } from "@/models/course";
import { axiosInstance } from "@/utils/axiosServer";

export const getAllCourses = async () => {
  try {
    const response = await axiosInstance.get("/courses");

    return courseSchema.array().parse(response.data);
  } catch (error) {
    return [];
  }
};
