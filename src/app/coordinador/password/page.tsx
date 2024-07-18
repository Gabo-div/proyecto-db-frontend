import ChangePasswordForm from "@/layouts/ChangePasswordForm";
import { getCurrentCoordinator } from "@/services/coordinator";

export default async function Password() {
  const coordinator = await getCurrentCoordinator();

  if (!coordinator) {
    return <div>No hay docente registrado</div>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center space-x-2">
        <h1 className="text-xl font-bold">Cambiar contraseña</h1>
      </div>
      <ChangePasswordForm userId={coordinator.user_id} />
    </div>
  );
}
