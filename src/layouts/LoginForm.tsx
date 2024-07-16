"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import loginAction from "@/actions/login";

const formSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, {
      message: "Su nombre de usuario debe tener al menos 3 caracteres",
    })
    .max(20, {
      message: "Su nombre de usuario no puede tener más de 20 caracteres",
    }),
  password: z.string().trim().min(8, {
    message: "Su contraseña debe tener al menos 8 caracteres",
  }),
});

type Inputs = z.infer<typeof formSchema>;

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: Inputs) => {
    const result = await loginAction(data);

    if (!result) {
      form.setError("username", {
        message: "Usuario o contraseña incorrectos",
      });

      form.setError("password", {
        message: "Usuario o contraseña incorrectos",
      });
      return;
    }

    if (result.user.role === "coordinator") {
      router.push("/coordinador");
    } else if (result.user.role === "teacher") {
      router.push("/docente");
    } else if (result.user.role === "representative") {
      router.push("/representante");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <FormControl>
                <Input placeholder="tbraunston0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-astronaut-900 hover:bg-astronaut-900/90 dark:bg-white dark:hover:bg-white/90"
        >
          Ingresar
        </Button>
      </form>
    </Form>
  );
}
