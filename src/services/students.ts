import { studentSchema, Student } from "@/models/student";
import { axiosInstance } from "@/utils/axiosServer";

export const getAllStudents = async () => {
  try {
    const response = await axiosInstance.get("/students");

    return studentSchema.array().parse(response.data);
  } catch (error) {
    return [];
  }
};

export const createStudent = async (data: {
  ic: string;
  name: string;
  last_name: string;
  current_year: number;
  status: Student["status"];
}) => {
  try {
    await axiosInstance.post("/students", data);

    return true;
  } catch (error) {
    return false;
  }
};

export const updateStudentById = async (
  id: number,
  data: {
    ic: string;
    name: string;
    last_name: string;
  },
) => {
  try {
    await axiosInstance.put(`/students/${id}`, data);

    return true;
  } catch (error) {
    return false;
  }
};
