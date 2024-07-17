import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateCourseDialog from "@/layouts/CreateCourseDialog";
import UpdateCourseDialog from "@/layouts/UpdateCourseDialog";
import { getAllCourses } from "@/services/courses";

export default async function Asignaturas() {
  const courses = await getAllCourses();

  const sortedCourses = courses.sort((a, b) => a.year - b.year);

  return (
    <div>
      <div className="mb-4 flex items-center space-x-2">
        <h1 className="text-xl font-bold">Asignaturas</h1>
        <CreateCourseDialog />
      </div>

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
                <TableCell>
                  <UpdateCourseDialog course={course} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
