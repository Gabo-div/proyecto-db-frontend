"use server";

import { axiosInstance } from "@/utils/axiosServer";

export const changePasswordAction = async (
  userId: number,
  newPassword: string,
) => {
  try {
    await axiosInstance.put(`/users/${userId}`, {
      password: newPassword,
    });

    return true;
  } catch (error) {
    return false;
  }
};
