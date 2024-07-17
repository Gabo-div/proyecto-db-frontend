import Image from "next/image";
import logo from "@/assets/logo.jpeg";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import LayoutLinks from "@/components/LayoutLinks";
import { redirect } from "next/navigation";
import { getCurrentCoordinator } from "@/services/coordinator";
import UserDropdown from "@/components/UserDropdown";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const coordinator = await getCurrentCoordinator();

  if (!coordinator) {
    redirect("/");
  }

  return (
    <div>
      <div className="fixed z-10 flex w-full flex-col bg-astronaut-900 dark:bg-zinc-900">
        <div className="flex items-center px-4 py-2">
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full"
          />

          <h1 className="ml-2 font-bold uppercase text-white">Coordinador</h1>

          <div className="ml-auto">
            <UserDropdown
              name={coordinator.name}
              last_name={coordinator.last_name}
            />
          </div>
        </div>
        <ScrollArea>
          <LayoutLinks
            basePath="/coordinador"
            links={[
              { name: "Inicio", href: "/" },
              { name: "Periodos", href: "/periodos" },
              { name: "Asignaturas", href: "/asignaturas" },
              { name: "Docentes", href: "/docentes" },
              { name: "Representantes", href: "/representantes" },
              { name: "Alumnos", href: "/alumnos" },
            ]}
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="min-h-screen bg-astronaut-100 dark:bg-zinc-950">
        <div className="pt-[110px]"></div>
        <div className="container mx-auto px-4 py-8">{children}</div>
      </div>
    </div>
  );
}
