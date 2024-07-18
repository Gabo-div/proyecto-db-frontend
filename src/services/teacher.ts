import { extChargeSchema } from "@/models/charge";
import { Qualification, qualificationSchema } from "@/models/qualification";
import { teacherSchema } from "@/models/teacher";
import { axiosInstance } from "@/utils/axiosServer";
import { z } from "zod";
import { getStudentById } from "./students";

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

export const createTeacher = async (data: {
  username: string;
  password: string;
  ic: string;
  name: string;
  last_name: string;
}) => {
  try {
    await axiosInstance.post("/teachers", data);

    return true;
  } catch (error) {
    return false;
  }
};

export const updateTeacherById = async (
  id: number,
  data: {
    ic: string;
    name: string;
    last_name: string;
  },
) => {
  try {
    await axiosInstance.put(`/teachers/${id}`, data);

    return true;
  } catch (error) {
    return false;
  }
};

export const getTeacherChargesById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/teachers/${id}/charges`);
    console.log(response.data);

    return extChargeSchema.array().parse(response.data);
  } catch (error) {
    return [];
  }
};

export const addTeacherCharge = async (
  id: number,
  data: {
    section: number;
    period_id: number;
    course_id: number;
    teacher_id: number;
  },
) => {
  try {
    await axiosInstance.post(`/teachers/${id}/charges`, data);

    return true;
  } catch (error) {
    return false;
  }
};

export const getChargeById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/teachers/charges/${id}`);

    return extChargeSchema.parse(response.data);
  } catch (error) {
    return null;
  }
};

export const getChargesQualifications = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/qualifications/search`, {
      params: {
        charge_id: id,
      },
    });

    const parsed = qualificationSchema
      .omit({
        teacher_name: true,
      })
      .extend({
        teacher_id: z.number(),
      })
      .array()
      .parse(response.data);

    const qualifications: (Qualification & { student_name: string })[] = [];

    for (const qualification of parsed) {
      const teacher = await getTeacherById(qualification.teacher_id);
      const student = await getStudentById(qualification.student_id);

      if (!teacher || !student) {
        qualifications.push({
          ...qualification,
          teacher_name: "Desconocido",
          student_name: "Desconocido",
        });
        continue;
      }

      qualifications.push({
        ...qualification,
        teacher_name: teacher.name + " " + teacher.last_name,
        student_name: student.name + " " + student.last_name,
      });
    }

    return qualifications;
  } catch (error) {
    return [];
  }
};

export const addChargeQualification = async (
  id: number,
  data: {
    value: number;
    lapse: number;
    student_id: number;
  },
) => {
  try {
    await axiosInstance.post(`/qualifications`, {
      value: data.value,
      lapse: data.lapse,
      student_id: data.student_id,
      charge_id: id,
    });

    return true;
  } catch (error) {
    return false;
  }
};
