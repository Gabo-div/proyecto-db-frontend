import { getChargeById, getChargesQualifications } from "@/services/teacher";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { groupQualificatinsByStudent } from "@/utils/qualifications";
import AddQualificationDialog from "@/layouts/AddQualificationDialog";

export default async function Asignatura({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  const charge = await getChargeById(id);

  if (!charge) {
    return <div>Asignatura no encontrada</div>;
  }

  const qualifications = await getChargesQualifications(charge.id);
  const groupedQualifications = groupQualificatinsByStudent(qualifications);

  const approvedStudents = groupedQualifications.filter(
    (q) => q.final !== null && q.final >= 10,
  );
  const approved = approvedStudents.length;

  const failedStudents = groupedQualifications.filter(
    (q) => q.final !== null && q.final < 10,
  );
  const failed = failedStudents.length;

  const finals = groupedQualifications.filter((q) => q.final !== null);
  const average =
    finals.reduce((acc, q) => acc + (q.final as number), 0) / finals.length;

  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-medium">Asignatura</h1>

      <div className="mb-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <p>
          <span className="font-medium">Nombre:</span> {charge.course_name}
        </p>
        <p>
          <span className="font-medium">Año:</span> {charge.course_year}
        </p>
      </div>
      <div className="mb-4 flex items-center space-x-2">
        <h1 className="text-xl font-bold">Notas</h1>
        <AddQualificationDialog charge={charge} />
      </div>

      <div className="mb-4 flex space-x-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-sm font-bold">Estudiantes aprobados: </h1>
          <p className="text-sm font-bold">{approved}</p>
        </div>
        <div className="flex items-center space-x-2">
          <h1 className="text-sm font-bold">Estudiantes reprobados: </h1>
          <p className="text-sm font-bold">{failed}</p>
        </div>
        <div className="flex items-center space-x-2">
          <h1 className="text-sm font-bold">Promedio: </h1>
          <p className="text-sm font-bold">
            {isNaN(average) ? 0 : average.toFixed(0)}
          </p>
        </div>
      </div>

      <div className="rounded-md border bg-white dark:bg-zinc-900">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Estudiante</TableHead>
              <TableHead>ID Estudiante</TableHead>
              <TableHead>Lapso 1</TableHead>
              <TableHead>Lapso 2</TableHead>
              <TableHead>Lapso 3</TableHead>
              <TableHead>Final</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groupedQualifications.map((student) => (
              <TableRow key={student.student_name}>
                <TableCell>{student.student_name}</TableCell>
                <TableCell>{student.student_id}</TableCell>
                <TableCell>{student.lapses[0] || "-"}</TableCell>
                <TableCell>{student.lapses[1] || "-"}</TableCell>
                <TableCell>{student.lapses[2] || "-"}</TableCell>
                <TableCell>{student.final?.toFixed(0) || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
