"use server";

import { createCourse, updateCourseById } from "@/services/courses";
import { revalidatePath } from "next/cache";

export const createCourseAction = async ({
  name,
  year,
}: {
  name: string;
  year: number;
}) => {
  const result = await createCourse({
    name,
    year,
  });

  revalidatePath("/coordinador/asignaturas");

  return result;
};

export const updateCourseAction = async (
  id: number,
  data: {
    name: string;
    year: number;
  },
) => {
  const result = await updateCourseById(id, data);

  revalidatePath("/coordinador/asignaturas");

  return result;
};
