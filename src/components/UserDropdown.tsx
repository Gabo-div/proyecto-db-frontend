"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import logoutAction from "@/actions/logout";

type Props = {
  name: string;
  last_name: string;
};

export default function UserDropdown({ name, last_name }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="size-10 text-sm">
          <AvatarFallback className="font-medium uppercase">
            {name[0] + last_name[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{name + " " + last_name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logoutAction()}>
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
