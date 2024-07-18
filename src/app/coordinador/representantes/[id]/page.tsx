import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import UpdateStudentDialog from "@/layouts/UpdateStudentDialog";

import {
  getRepresentativeById,
  getRepresentativeStudentsById,
} from "@/services/representative";
import RepresentativeStudentDialog from "@/layouts/RepresentativeStudentDialog";

export default async function Representante({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  const representative = await getRepresentativeById(id);
  const students = await getRepresentativeStudentsById(id);

  const sortedStudents = students.sort(
    (a, b) => a.current_year - b.current_year,
  );

  if (!representative) {
    return <div>Representante no encontrado</div>;
  }

  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-medium">Representante</h1>

      <div className="mb-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <p>
          <span className="font-medium">Nombre:</span>{" "}
          {representative.name + " " + representative.last_name}
        </p>
        <p>
          <span className="font-medium">Cedula:</span> {representative.ic}
        </p>
      </div>

      <div className="mb-4 flex items-center space-x-2">
        <h2 className="text-xl font-medium">Representados</h2>
        <RepresentativeStudentDialog representative={representative} />
      </div>

      <div className="rounded-md border bg-white dark:bg-zinc-900">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>Cedula</TableHead>
              <TableHead>Año Actual</TableHead>
              <TableHead>Estatus</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.last_name}</TableCell>
                <TableCell>{student.ic}</TableCell>
                <TableCell>{student.current_year}</TableCell>
                <TableCell>
                  {student.status === "active" ? (
                    <Badge className="bg-astronaut-900 hover:bg-astronaut-900 dark:bg-zinc-700 dark:text-zinc-300">
                      Activo
                    </Badge>
                  ) : null}
                  {student.status === "retired" ? (
                    <Badge className="bg-red-500 hover:bg-red-500 dark:bg-zinc-700 dark:text-zinc-300">
                      Retirado
                    </Badge>
                  ) : null}
                  {student.status === "completed" ? (
                    <Badge className="bg-green-500 hover:bg-green-500 dark:bg-zinc-700 dark:text-zinc-300">
                      Completado
                    </Badge>
                  ) : null}
                </TableCell>
                <TableCell>
                  <UpdateStudentDialog student={student} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
