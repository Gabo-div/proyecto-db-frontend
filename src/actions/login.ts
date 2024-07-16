"use server";

import { login } from "@/services/auth";
import { cookies } from "next/headers";

export default async function loginAction({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const result = await login({
    username,
    password,
  });

  if (!result) {
    return null;
  }

  cookies().set("token", result.token);

  return result;
}
