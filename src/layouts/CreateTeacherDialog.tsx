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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { createTeacherAction } from "@/actions/teacher";

const formSchema = z.object({
  username: z.string().trim().min(1, "Debe ingresar un usuario"),
  password: z.string().trim().min(1, "Debe ingresar una contraseña"),
  ic: z.string().trim().min(1, "Debe ingresar una cedula"),
  name: z.string().trim().min(1, "Debe ingresar un nombre"),
  last_name: z.string().trim().min(1, "Debe ingresar un apellido"),
});

type Inputs = z.infer<typeof formSchema>;

export default function CreateTeacherDialog() {
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      ic: "",
      name: "",
      last_name: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: Inputs) => {
    const result = await createTeacherAction(data);

    if (!result) {
      toast({
        title: "Error al crear el docente",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Docente creado correctamente",
    });

    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <CirclePlus className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Docente</DialogTitle>
          <DialogDescription>Crea un nuevo docente.</DialogDescription>
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
                      <Input placeholder="jperez123" {...field} />
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
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cedula</FormLabel>
                    <FormControl>
                      <Input placeholder="v123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Perez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-astronaut-900 hover:bg-astronaut-900/90 dark:bg-white dark:hover:bg-white/90"
              >
                Crear
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
