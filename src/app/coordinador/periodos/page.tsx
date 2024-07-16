import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllPeriods } from "@/services/periods";

export default async function Periodos() {
  const periods = await getAllPeriods();

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Periodos Academicos</h1>

      <div className="rounded-md border bg-white dark:bg-zinc-900">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>id</TableHead>
              <TableHead>Inicio</TableHead>
              <TableHead>Fin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {periods.map((period) => (
              <TableRow key={period.id}>
                <TableCell>{period.id}</TableCell>
                <TableCell>{period.start_date}</TableCell>
                <TableCell>{period.end_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
