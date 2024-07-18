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

import { Representative } from "@/models/representative";
import { addRepresentativeStudentAction } from "@/actions/representative";

const formSchema = z.object({
  ic: z.string().trim().min(1, "Debe ingresar una cedula"),
});

type Inputs = z.infer<typeof formSchema>;

type Props = {
  representative: Representative;
};

export default function RepresentativeStudentDialog({ representative }: Props) {
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ic: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: Inputs) => {
    const result = await addRepresentativeStudentAction(
      representative.user_id,
      {
        student_ic: data.ic,
      },
    );

    if (!result) {
      toast({
        title: "Error al agregar el alumno",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Alumno agregado correctamente",
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
          <DialogTitle>Agregar Alumno</DialogTitle>
          <DialogDescription>
            Agregar un nuevo alumno al representante.
          </DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              autoComplete="off"
              className="space-y-8"
            >
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
