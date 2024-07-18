"use server";

import {
  addChargeQualification,
  addTeacherCharge,
  createTeacher,
  updateTeacherById,
} from "@/services/teacher";
import { revalidatePath } from "next/cache";

export const createTeacherAction = async (data: {
  username: string;
  password: string;
  ic: string;
  name: string;
  last_name: string;
}) => {
  const result = await createTeacher(data);

  revalidatePath("/coordinador/docentes");

  return result;
};

export const updateTeacherAction = async (
  id: number,
  data: {
    ic: string;
    name: string;
    last_name: string;
  },
) => {
  const result = await updateTeacherById(id, data);

  revalidatePath("/coordinador/docentes");

  return result;
};

export const addTeacherChargeAction = async (
  id: number,
  data: {
    section: number;
    period_id: number;
    course_id: number;
    teacher_id: number;
  },
) => {
  const result = await addTeacherCharge(id, data);

  revalidatePath("/coordinador/docentes");

  return result;
};

export const addChargeQualificationAction = async (
  id: number,
  data: {
    value: number;
    lapse: number;
    student_id: number;
  },
) => {
  const result = await addChargeQualification(id, data);

  revalidatePath("/docente/asignaturas");

  return result;
};
