import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllCourses } from "@/services/courses";

export default async function Asignaturas() {
  const courses = await getAllCourses();

  const sortedCourses = courses.sort((a, b) => a.year - b.year);

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Asignaturas</h1>

      <div className="rounded-md border bg-white dark:bg-zinc-900">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>id</TableHead>
              <TableHead>Asignatura</TableHead>
              <TableHead>Año</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.year}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
