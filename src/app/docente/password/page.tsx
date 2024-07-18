import ChangePasswordForm from "@/layouts/ChangePasswordForm";
import { getCurrentTeacher } from "@/services/teacher";

export default async function Password() {
  const teacher = await getCurrentTeacher();

  if (!teacher) {
    return <div>No hay docente registrado</div>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center space-x-2">
        <h1 className="text-xl font-bold">Cambiar contraseña</h1>
      </div>
      <ChangePasswordForm userId={teacher.user_id} />
    </div>
  );
}
