import { periodSchema } from "@/models/period";
import { axiosInstance } from "@/utils/axiosServer";

export const getAllPeriods = async () => {
  try {
    const response = await axiosInstance.get("/periods");

    return periodSchema.array().parse(response.data);
  } catch (error) {
    return [];
  }
};

export const createPeriod = async ({
  start_date,
  end_date,
}: {
  start_date: string;
  end_date: string;
}) => {
  try {
    await axiosInstance.post("/periods", {
      start_date,
      end_date,
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const updatePeriodById = async (
  id: number,
  data: { start_date: string; end_date: string },
) => {
  try {
    await axiosInstance.put(`/periods/${id}`, data);

    return true;
  } catch (error) {
    return false;
  }
};
