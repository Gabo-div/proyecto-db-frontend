import Image from "next/image";
import logo from "@/assets/logo.jpeg";

import LayoutLinks from "@/components/LayoutLinks";
import { getCurrentTeacher } from "@/services/teacher";
import { redirect } from "next/navigation";
import UserDropdown from "@/components/UserDropdown";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const teacher = await getCurrentTeacher();

  if (!teacher) {
    redirect("/");
  }

  return (
    <div>
      <div className="fixed flex w-full flex-col bg-astronaut-900 dark:bg-zinc-900">
        <div className="flex items-center px-4 py-2">
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full"
          />

          <h1 className="ml-2 font-bold uppercase text-white">Docente</h1>

          <div className="ml-auto">
            <UserDropdown name={teacher.name} last_name={teacher.last_name} />
          </div>
        </div>
        <LayoutLinks
          basePath="/docente"
          links={[
            { name: "Inicio", href: "/" },
            { name: "Asignaturas", href: "/asignaturas" },
            { name: "Cambiar Contraseña", href: "/password" },
          ]}
        />
      </div>

      <div className="min-h-screen bg-astronaut-100 dark:bg-zinc-950">
        <div className="pt-[110px]"></div>
        <div className="container mx-auto px-4 py-8">{children}</div>
      </div>
    </div>
  );
}
