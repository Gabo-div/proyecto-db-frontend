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
import { useToast } from "@/components/ui/use-toast";
import { changePasswordAction } from "@/actions/password";

export const formSchema = z.object({
  new_password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

type Inputs = z.infer<typeof formSchema>;

type Props = {
  userId: number;
};

export default function ChangePasswordForm({ userId }: Props) {
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_password: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: Inputs) => {
    const result = await changePasswordAction(userId, data.new_password);

    if (!result) {
      toast({
        title: "Error cambiando contraseña",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Contraseña cambiada correctamente",
    });

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        className="mx-auto max-w-xl space-y-8"
      >
        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nueva contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-astronaut-900 hover:bg-astronaut-900/90 dark:bg-white dark:hover:bg-white/90"
        >
          Cambiar
        </Button>
      </form>
    </Form>
  );
}
