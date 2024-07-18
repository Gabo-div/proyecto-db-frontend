import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TeacherChargeDialog from "@/layouts/TeacherChargeDialog";
import { getTeacherById, getTeacherChargesById } from "@/services/teacher";

export default async function Docente({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const teacher = await getTeacherById(id);
  const charges = await getTeacherChargesById(id);
  const sortedCharges = charges.sort((a, b) => a.course_year - b.course_year);

  if (!teacher) {
    return <div>Docente no encontrado</div>;
  }

  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-medium">Docente</h1>

      <div className="mb-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <p>
          <span className="font-medium">Nombre:</span>{" "}
          {teacher.name + " " + teacher.last_name}
        </p>
        <p>
          <span className="font-medium">Cedula:</span> {teacher.ic}
        </p>
      </div>
      <div className="mb-4 flex items-center space-x-2">
        <h1 className="text-xl font-bold">Carga</h1>
        <TeacherChargeDialog teacher={teacher} />
      </div>
      <div className="rounded-md border bg-white dark:bg-zinc-900">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asignatura</TableHead>
              <TableHead>Año</TableHead>
              <TableHead>Inicio</TableHead>
              <TableHead>Fin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCharges.map((course) => (
              <TableRow key={course.course_name + course.course_year}>
                <TableCell>{course.course_name}</TableCell>
                <TableCell>{course.course_year}</TableCell>
                <TableCell>{course.start_date}</TableCell>
                <TableCell>{course.end_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
