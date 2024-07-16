import { Card } from "@/components/ui/card";
import LoginForm from "@/layouts/LoginForm";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.jpeg";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="pattern-dots fixed -z-10 h-full w-full pattern-bg-astronaut-200 pattern-astronaut-800 pattern-opacity-20 pattern-size-6 dark:pattern-zinc-600 dark:pattern-bg-zinc-950"></div>

      <main className="container flex h-full w-full max-w-lg items-center justify-center">
        <Card className="flex w-full flex-col p-8">
          <Image
            src={logo}
            alt="Logo"
            width={120}
            height={120}
            className="mx-auto mb-4 rounded-full"
          />

          <h1 className="mb-1 text-center text-2xl font-bold">
            Liceo Santa Marta
          </h1>

          <p className="mb-4 text-center text-sm">
            Sistema en linea para la gestión de los alumnos
          </p>

          <LoginForm />

          <p className="mt-4 text-sm">
            Si usted es un representante primero debe{" "}
            <Link href="/register" className="text-blue-500">
              registrarse
            </Link>{" "}
            para poder ingresar.
          </p>
        </Card>
      </main>
    </div>
  );
}
