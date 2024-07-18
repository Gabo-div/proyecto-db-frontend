import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateTeacherDialog from "@/layouts/CreateTeacherDialog";
import UpdateTeacherDialog from "@/layouts/UpdateTeacherDialog";
import { getAllTeachers } from "@/services/teacher";
import { Eye } from "lucide-react";
import Link from "next/link";

export default async function Docentes() {
  const teachers = await getAllTeachers();

  return (
    <div>
      <div className="mb-4 flex items-center space-x-2">
        <h1 className="text-xl font-bold">Docentes</h1>
        <CreateTeacherDialog />
      </div>

      <div className="rounded-md border bg-white dark:bg-zinc-900">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>ID Usuario</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>Cedula</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.id}</TableCell>
                <TableCell>{teacher.user_id}</TableCell>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.last_name}</TableCell>
                <TableCell>{teacher.ic}</TableCell>
                <TableCell>{teacher.contact}</TableCell>
                <TableCell>
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Link href={`/coordinador/docentes/${teacher.user_id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <UpdateTeacherDialog teacher={teacher} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
