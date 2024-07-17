import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateRepresentativeDialog from "@/layouts/CreateRepresentativeDialog";
import UpdateRepresentativeDialog from "@/layouts/UpdateRepresentativeDialog";
import { getAllRepresentatives } from "@/services/representative";

export default async function Representantes() {
  const representatives = await getAllRepresentatives();

  return (
    <div>
      <div className="mb-4 flex items-center space-x-2">
        <h1 className="text-xl font-bold">Representantes</h1>
        <CreateRepresentativeDialog />
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
            {representatives.map((representative) => (
              <TableRow key={representative.id}>
                <TableCell>{representative.id}</TableCell>
                <TableCell>{representative.user_id}</TableCell>
                <TableCell>{representative.name}</TableCell>
                <TableCell>{representative.last_name}</TableCell>
                <TableCell>{representative.ic}</TableCell>
                <TableCell>
                  <UpdateRepresentativeDialog representative={representative} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
