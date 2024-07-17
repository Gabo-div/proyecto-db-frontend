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
import { Representative } from "@/models/representative";
import { updateRepresentativeAction } from "@/actions/representative";

const formSchema = z.object({
  ic: z.string().trim().min(1, "Debe ingresar una cedula"),
  name: z.string().trim().min(1, "Debe ingresar un nombre"),
  last_name: z.string().trim().min(1, "Debe ingresar un apellido"),
});

type Inputs = z.infer<typeof formSchema>;

type Props = {
  representative: Representative;
};

export default function UpdateRepresentativeDialog({ representative }: Props) {
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...representative,
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: Inputs) => {
    const result = await updateRepresentativeAction(representative.id, data);

    if (!result) {
      toast({
        title: "Error al edutar el representante",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Representante editado correctamente",
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
          <DialogTitle>Editar Representante</DialogTitle>
          <DialogDescription>Edita un representante.</DialogDescription>
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
                Editar
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
