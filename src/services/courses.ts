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

export const createCourse = async (data: { name: string; year: number }) => {
  try {
    await axiosInstance.post("/courses", data);

    return true;
  } catch (error) {
    return false;
  }
};

export const updateCourseById = async (
  id: number,
  data: { name: string; year: number },
) => {
  try {
    await axiosInstance.put(`/courses/${id}`, data);

    return true;
  } catch (error) {
    return false;
  }
};
