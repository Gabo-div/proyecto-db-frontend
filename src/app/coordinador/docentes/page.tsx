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
                <TableCell>
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
