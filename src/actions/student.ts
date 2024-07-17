"use server";

import { Student } from "@/models/student";
import { createStudent, updateStudentById } from "@/services/students";
import { revalidatePath } from "next/cache";

export const createStudentAction = async (data: {
  ic: string;
  name: string;
  last_name: string;
  current_year: number;
  status: Student["status"];
}) => {
  const result = await createStudent(data);

  revalidatePath("/coordinador/alumnos");

  return result;
};

export const updateStudentAction = async (
  id: number,
  data: {
    ic: string;
    name: string;
    last_name: string;
  },
) => {
  const result = await updateStudentById(id, data);

  revalidatePath("/coordinador/alumnos");

  return result;
};
