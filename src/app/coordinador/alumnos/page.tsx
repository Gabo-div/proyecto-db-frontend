import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getAllStudents } from "@/services/students";

export default async function Alumnos() {
  const students = await getAllStudents();

  const sortedStudents = students.sort(
    (a, b) => a.current_year - b.current_year,
  );

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Alumnos</h1>

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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
