import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Link from "next/link";

type Props = {
  name: string;
  lastname: string;
  ic: string;
  id: number;
};

export default function RepresentadoCard({ name, lastname, ic, id }: Props) {
  return (
    <Link className="group" href={"/representante/representados/" + id}>
      <Card className="flex flex-col bg-white p-4 group-hover:border-zinc-400 dark:bg-zinc-900 dark:group-hover:border-zinc-600">
        <div className="flex items-center">
          <Avatar>
            <AvatarFallback>
              {name.charAt(0) + lastname.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <h2 className="text-sm font-medium">
              {name} {lastname}
            </h2>
            <p className="text-xs text-zinc-500">{ic}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
