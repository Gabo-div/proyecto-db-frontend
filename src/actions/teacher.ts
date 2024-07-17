"use server";

import { createTeacher, updateTeacherById } from "@/services/teacher";
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
