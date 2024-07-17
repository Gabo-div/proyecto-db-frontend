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
import { createPeriodAction } from "@/actions/period";
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

const formSchema = z.object({
  start_date: z.string().date("Ingrese una fecha válida"),
  end_date: z.string().date("Ingrese una fecha válida"),
});

type Inputs = z.infer<typeof formSchema>;

export default function CreatePeriodDialog() {
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start_date: "",
      end_date: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: Inputs) => {
    const result = await createPeriodAction(data);

    if (!result) {
      toast({
        title: "Error al crear el periodo",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Periodo creado correctamente",
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
          <DialogTitle>Nuevo Periodo</DialogTitle>
          <DialogDescription>
            Crea un nuevo periodo de estudio.
          </DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              autoComplete="off"
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inicio</FormLabel>
                    <FormControl>
                      <Input placeholder="2023-01-01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fin</FormLabel>
                    <FormControl>
                      <Input placeholder="2024-01-01" {...field} />
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
