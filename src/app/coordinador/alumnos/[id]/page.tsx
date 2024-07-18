import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getStudentById,
  getStudentRepresentativesByIC,
  getStudentQualifications,
} from "@/services/students";
import { groupQualifications } from "@/utils/qualifications";

const getYearName = (year: string) => {
  switch (year) {
    case "1":
      return "Primer Año";
    case "2":
      return "Segundo Año";
    case "3":
      return "Tercer Año";
    case "4":
      return "Cuarto Año";
    case "5":
      return "Quinto Año";
    default:
      return "";
  }
};

export default async function Alumno({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const student = await getStudentById(id);

  if (!student) {
    return <div>Estudiante no encontrado</div>;
  }
  const qualifications = await getStudentQualifications(id);
  const groupedQualifications = groupQualifications(qualifications);
  const representatives = await getStudentRepresentativesByIC(student.ic);

  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-medium">Estudiante</h1>

      <div className="mb-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <p>
          <span className="font-medium">Nombre:</span>{" "}
          {student.name + " " + student.last_name}
        </p>
        <p>
          <span className="font-medium">Cedula:</span> {student.ic}
        </p>
      </div>

      <div className="mb-4 flex items-center space-x-2">
        <h2 className="text-xl font-medium">Representantes</h2>
      </div>
      <div className="mb-8 rounded-md border bg-white dark:bg-zinc-900">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>ID Usuario</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>Cedula</TableHead>
              <TableHead>Contacto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {representatives.map((representative) => (
              <TableRow key={representative.id}>
                <TableCell>{representative.id}</TableCell>
                <TableCell>{representative.user_id}</TableCell>
                <TableCell>{representative.name}</TableCell>
                <TableCell>{representative.last_name}</TableCell>
                <TableCell>{representative.ic}</TableCell>
                <TableCell>{representative.contact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedQualifications).map(([year, yearGroup]) => {
          const courses = Object.entries(yearGroup);

          return (
            <div key={year}>
              <h2 className="mb-4 text-xl font-medium">
                Notas {getYearName(year)}
              </h2>
              <div className="rounded-md border bg-white dark:bg-zinc-900">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Materia</TableHead>
                      <TableHead>Docente</TableHead>
                      <TableHead>Lapso 1</TableHead>
                      <TableHead>Lapso 2</TableHead>
                      <TableHead>Lapso 3</TableHead>
                      <TableHead>Final</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center font-medium"
                        >
                          No hay notas para este año
                        </TableCell>
                      </TableRow>
                    )}
                    {courses.map(([course, courseGroup]) => {
                      const teacherName = courseGroup.teacher_name;
                      const lapses = courseGroup.lapses;
                      const final = courseGroup.final;

                      return (
                        <TableRow key={course}>
                          <TableCell className="font-medium">
                            {course}
                          </TableCell>
                          <TableCell>{teacherName}</TableCell>
                          <TableCell>{lapses[0] || "-"}</TableCell>
                          <TableCell>{lapses[1] || "-"}</TableCell>
                          <TableCell>{lapses[2] || "-"}</TableCell>
                          <TableCell>
                            {final ? final.toFixed(0) : "-"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
