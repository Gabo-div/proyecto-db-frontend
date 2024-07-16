import RepresentadoCard from "@/components/RepresentadoCard";
import { getCurrentRepresentativeStudents } from "@/services/representative";

export default async function Representados() {
  const students = await getCurrentRepresentativeStudents();

  return (
    <div className="flex flex-col">
      <h1 className="mb-4 text-xl font-medium">Representados</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {students.map((student) => (
          <RepresentadoCard
            key={student.id}
            name={student.name}
            lastname={student.last_name}
            ic={student.ic}
            id={student.id}
          />
        ))}
      </div>
    </div>
  );
}
