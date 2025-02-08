import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../api/axiosInstance";
import { PrivateRoutes } from "../models/routes";

const InvitePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.location.pathname.split("/invite/")[1];

    const handleInvite = async () => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        await axiosInstance.post(`/api/invitations/${token}/accept`);
        setSuccess(true);
        setTimeout(() => navigate(`${PrivateRoutes.PRIVATE}`), 2000); // Redirigir después de 2 segundos, por ejemplo
      } catch (err) {
        setError("No se pudo procesar la invitación o la invitación ha expirado.");
      } finally {
        setLoading(false);
      }
    };

    handleInvite();
  }, [navigate]);

  return (
    <div>
      {loading ? (
        <p>Procesando invitación...</p>
      ) : success ? (
        <p>¡Te has unido exitosamente!</p>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default InvitePage;
