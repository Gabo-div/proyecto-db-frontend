import ChangePasswordForm from "@/layouts/ChangePasswordForm";
import { getCurrentRepresentative } from "@/services/representative";

export default async function Password() {
  const representative = await getCurrentRepresentative();

  if (!representative) {
    return <div>No hay docente registrado</div>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center space-x-2">
        <h1 className="text-xl font-bold">Asignaturas</h1>
      </div>
      <ChangePasswordForm userId={representative.user_id} />
    </div>
  );
}
