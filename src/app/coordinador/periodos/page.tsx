import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getAllPeriods } from "@/services/periods";
import CreatePeriodDialog from "@/layouts/CreatePeriodDialog";
import UpdatePeriodDialog from "@/layouts/UpdatePeriodDialog";

export default async function Periodos() {
  const periods = await getAllPeriods();
  return (
    <div>
      <div className="mb-4 flex items-center space-x-2">
        <h1 className="text-xl font-bold">Periodos Academicos</h1>
        <CreatePeriodDialog />
      </div>
      <div className="rounded-md border bg-white dark:bg-zinc-900">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>id</TableHead>
              <TableHead>Inicio</TableHead>
              <TableHead>Fin</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {periods.map((period) => (
              <TableRow key={period.id}>
                <TableCell>{period.id}</TableCell>
                <TableCell>{period.start_date}</TableCell>
                <TableCell>{period.end_date}</TableCell>
                <TableCell>
                  <UpdatePeriodDialog period={period} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
