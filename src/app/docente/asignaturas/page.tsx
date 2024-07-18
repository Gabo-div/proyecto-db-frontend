import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCurrentTeacher, getTeacherChargesById } from "@/services/teacher";
import { Eye } from "lucide-react";
import Link from "next/link";

export default async function Asignaturas() {
  const teacher = await getCurrentTeacher();

  if (!teacher) {
    return <div>No hay docente registrado</div>;
  }

  const charges = await getTeacherChargesById(teacher.user_id);

  return (
    <div>
      <div className="mb-4 flex items-center space-x-2">
        <h1 className="text-xl font-bold">Asignaturas</h1>
      </div>

      <div className="rounded-md border bg-white dark:bg-zinc-900">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asignatura</TableHead>
              <TableHead>Año</TableHead>
              <TableHead>Inicio</TableHead>
              <TableHead>Fin</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {charges.map((course) => (
              <TableRow key={course.course_name + course.course_year}>
                <TableCell>{course.course_name}</TableCell>
                <TableCell>{course.course_year}</TableCell>
                <TableCell>{course.start_date}</TableCell>
                <TableCell>{course.end_date}</TableCell>
                <TableCell>
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Link href={`/docente/asignaturas/${course.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
