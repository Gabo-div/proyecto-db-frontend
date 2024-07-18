import { Qualification, qualificationSchema } from "@/models/qualification";
import { representativeSchema } from "@/models/representative";
import { Student, studentSchema } from "@/models/student";
import { axiosInstance } from "@/utils/axiosServer";
import { z } from "zod";
import { getTeacherById } from "./teacher";

export const getAllRepresentatives = async () => {
  try {
    const response = await axiosInstance.get("/representatives");

    return representativeSchema.array().parse(response.data);
  } catch (error) {
    return [];
  }
};

export const getCurrentRepresentative = async () => {
  try {
    const response = await axiosInstance.get("/representatives/me");

    return representativeSchema.parse(response.data);
  } catch (error) {
    return null;
  }
};

export const getCurrentRepresentativeStudents = async (): Promise<
  Student[]
> => {
  try {
    const response = await axiosInstance.get("/representatives/me/students");

    return studentSchema.array().parse(response.data);
  } catch (error) {
    return [];
  }
};

export const getCurrentRepresentativeStudent = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/students/${id}`);

    return studentSchema.parse(response.data);
  } catch (error) {
    return null;
  }
};

export const getCurrentRepresentativeStudentQualifications = async (
  id: number,
) => {
  try {
    const response = await axiosInstance.get(`/students/${id}/qualifications`);

    const parsed = qualificationSchema
      .omit({
        teacher_name: true,
      })
      .extend({
        teacher_id: z.number(),
      })
      .array()
      .parse(response.data);

    const qualifications: Qualification[] = [];

    for (const qualification of parsed) {
      const teacher = await getTeacherById(qualification.teacher_id);

      if (!teacher) {
        qualifications.push({
          ...qualification,
          teacher_name: "Desconocido",
        });
        continue;
      }

      qualifications.push({
        ...qualification,
        teacher_name: teacher.name + " " + teacher.last_name,
      });
    }

    return qualifications;
  } catch (error) {
    return [];
  }
};

export const createRepresentative = async (data: {
  username: string;
  password: string;
  ic: string;
  name: string;
  last_name: string;
}) => {
  try {
    await axiosInstance.post("/representatives", data);

    return true;
  } catch (error) {
    return false;
  }
};

export const updateRepresentativeById = async (
  id: number,
  data: {
    ic: string;
    name: string;
    last_name: string;
  },
) => {
  try {
    await axiosInstance.put(`/representatives/${id}`, data);

    return true;
  } catch (error) {
    return false;
  }
};

export const getRepresentativeById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/representatives/${id}`);

    return representativeSchema.parse(response.data);
  } catch (error) {
    return null;
  }
};

export const getRepresentativeStudentsById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/representatives/${id}/students`);

    return studentSchema.array().parse(response.data);
  } catch (error) {
    return [];
  }
};

export const addRepresentativeStudent = async (
  id: number,
  data: {
    student_ic: string;
  },
) => {
  try {
    await axiosInstance.post(`/representatives/${id}/students`, {
      ic: data.student_ic,
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const deleteRepresentativeById = async (id: number) => {
  try {
    await axiosInstance.delete(`/representatives/${id}`);

    return true;
  } catch (error) {
    return false;
  }
};
