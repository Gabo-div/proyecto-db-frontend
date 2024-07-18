import Image from "next/image";
import logo from "@/assets/logo.jpeg";

import LayoutLinks from "@/components/LayoutLinks";
import { getCurrentRepresentative } from "@/services/representative";
import { redirect } from "next/navigation";
import UserDropdown from "@/components/UserDropdown";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const representative = await getCurrentRepresentative();

  if (!representative) {
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

          <h1 className="ml-2 font-bold uppercase text-white">Representante</h1>

          <div className="ml-auto">
            <UserDropdown
              name={representative.name}
              last_name={representative.last_name}
            />
          </div>
        </div>
        <LayoutLinks
          basePath="/representante"
          links={[
            { name: "Inicio", href: "/" },
            { name: "Representados", href: "/representados" },
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
