import { teacherSchema } from "@/models/teacher";
import { axiosInstance } from "@/utils/axiosServer";

export const getAllTeachers = async () => {
  try {
    const response = await axiosInstance.get("/teachers");

    return teacherSchema.array().parse(response.data);
  } catch (error) {
    return [];
  }
};

export const getCurrentTeacher = async () => {
  try {
    const response = await axiosInstance.get("/teachers/me");

    return teacherSchema.parse(response.data);
  } catch (error) {
    return null;
  }
};

export const getTeacherById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/teachers/${id}`);

    return teacherSchema.parse(response.data);
  } catch (error) {
    return null;
  }
};
