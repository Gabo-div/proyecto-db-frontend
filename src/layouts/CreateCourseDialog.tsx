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
import { createCourseAction } from "@/actions/course";

const formSchema = z.object({
  name: z.string().trim().min(1, "Debe ingresar un nombre"),
  year: z.coerce
    .number()
    .min(1, "Debe ingresar un año entre 1 y 5")
    .max(5, "Debe ingresar un año entre 1 y 5"),
});

type Inputs = z.infer<typeof formSchema>;

export default function CreateCourseDialog() {
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      year: 1,
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: Inputs) => {
    const result = await createCourseAction(data);

    if (!result) {
      toast({
        title: "Error al crear la asignatura",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Asignatura creada correctamente",
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
          <DialogTitle>Nueva Asignatura</DialogTitle>
          <DialogDescription>Crea una nueva asignatura.</DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              autoComplete="off"
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Fisica" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Año</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1" {...field} />
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
