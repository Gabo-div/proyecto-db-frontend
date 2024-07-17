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
import { Period } from "@/models/period";
import { updatePeriodAction } from "@/actions/period";

const formSchema = z.object({
  start_date: z.string().date("Ingrese una fecha válida"),
  end_date: z.string().date("Ingrese una fecha válida"),
});

type Inputs = z.infer<typeof formSchema>;

type Props = {
  period: Period;
};

export default function UpdatePeriodDialog({ period }: Props) {
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...period,
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: Inputs) => {
    const result = await updatePeriodAction(period.id, data);

    if (!result) {
      toast({
        title: "Error al editar el periodo",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Periodo editado correctamente",
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
          <DialogTitle>Editar Periodo</DialogTitle>
          <DialogDescription>Edita un periodo de estudio.</DialogDescription>
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
                Editar
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
