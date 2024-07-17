"use server";

import { createPeriod, updatePeriodById } from "@/services/periods";
import { revalidatePath } from "next/cache";

export const createPeriodAction = async ({
  start_date,
  end_date,
}: {
  start_date: string;
  end_date: string;
}) => {
  const result = await createPeriod({
    start_date,
    end_date,
  });

  revalidatePath("/coordinador/periodos");

  return result;
};

export const updatePeriodAction = async (
  id: number,
  data: {
    start_date: string;
    end_date: string;
  },
) => {
  const result = await updatePeriodById(id, data);

  revalidatePath("/coordinador/periodos");

  return result;
};
