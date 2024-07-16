import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getCurrentRepresentativeStudent,
  getCurrentRepresentativeStudentQualifications,
} from "@/services/representative";
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

export default async function Representado({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  const student = await getCurrentRepresentativeStudent(id);
  const qualifications =
    await getCurrentRepresentativeStudentQualifications(id);

  const groupedQualifications = groupQualifications(qualifications);

  if (!student) {
    return <div>Estudiante no encontrado</div>;
  }

  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-medium">
        Notas del estudiante
      </h1>

      <div className="mb-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <p>
          <span className="font-medium">Nombre:</span>{" "}
          {student.name + " " + student.last_name}
        </p>
        <p>
          <span className="font-medium">Cedula:</span> {student.ic}
        </p>
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
                          <TableCell>{final || "-"}</TableCell>
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
