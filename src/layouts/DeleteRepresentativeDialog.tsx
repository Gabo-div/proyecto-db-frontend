"use client";

import { deleteRepresentativeAction } from "@/actions/representative";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Representative } from "@/models/representative";
import { Trash } from "lucide-react";

type Props = {
  representative: Representative;
};

export default function DeleteRepresentativeDialog({ representative }: Props) {
  const { toast } = useToast();

  const onDelete = async () => {
    const result = await deleteRepresentativeAction(representative.user_id);

    if (!result) {
      toast({
        title: "Error al eliminar el representante",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Representante eliminado correctamente",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-500/90 dark:text-red-500 dark:hover:text-red-500/90"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
