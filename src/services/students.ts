import { Qualification, qualificationSchema } from "@/models/qualification";
import { studentSchema, Student } from "@/models/student";
import { axiosInstance } from "@/utils/axiosServer";
import { getTeacherById } from "./teacher";
import { z } from "zod";
import { representativeSchema } from "@/models/representative";

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

export const getStudentById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/students/${id}`);

    return studentSchema.parse(response.data);
  } catch (error) {
    return null;
  }
};

export const getStudentQualifications = async (id: number) => {
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

export const getStudentRepresentativesByIC = async (ic: string) => {
  try {
    const response = await axiosInstance.get(`/students/${ic}/info`);

    return representativeSchema.array().parse(response.data.representatives);
  } catch (error) {
    return [];
  }
};
