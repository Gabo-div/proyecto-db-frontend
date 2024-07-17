"use server";

import {
  createRepresentative,
  updateRepresentativeById,
} from "@/services/representative";
import { revalidatePath } from "next/cache";

export const createRepresentativeAction = async (data: {
  username: string;
  password: string;
  ic: string;
  name: string;
  last_name: string;
}) => {
  const result = await createRepresentative(data);

  revalidatePath("/coordinador/representantes");

  return result;
};

export const updateRepresentativeAction = async (
  id: number,
  data: {
    ic: string;
    name: string;
    last_name: string;
  },
) => {
  const result = await updateRepresentativeById(id, data);

  revalidatePath("/coordinador/representantes");

  return result;
};
