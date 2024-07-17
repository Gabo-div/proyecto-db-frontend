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
import { Pencil } from "lucide-react";
import { Course } from "@/models/course";
import { updateCourseAction } from "@/actions/course";

const formSchema = z.object({
  name: z.string().trim().min(1, "Debe ingresar un nombre"),
  year: z.coerce
    .number()
    .min(1, "Debe ingresar un año entre 1 y 5")
    .max(5, "Debe ingresar un año entre 1 y 5"),
});

type Inputs = z.infer<typeof formSchema>;

type Props = {
  course: Course;
};

export default function UpdateCourseDialog({ course }: Props) {
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...course,
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: Inputs) => {
    const result = await updateCourseAction(course.id, data);

    if (!result) {
      toast({
        title: "Error al editar la asignatura",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Asignatura editada correctamente",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Asignatura</DialogTitle>
          <DialogDescription>Edita una asignatura.</DialogDescription>
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
                Editar
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
