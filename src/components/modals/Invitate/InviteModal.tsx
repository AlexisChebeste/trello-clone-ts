import { useState } from "react";
import { Loader, Copy, X } from "lucide-react";
import axiosInstance from "../../../api/axiosInstance";

interface InviteModalProps {
  onClose: () => void;
  type: string;
  id: string;
}

export default function InviteModal({  onClose, type, id }: InviteModalProps) {
  const [loading, setLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInvite = async () => {
    
    setLoading(true);
    setError(null);
    setInviteLink(null);

    try {
      const response = await axiosInstance.post(`/api/${type}/${id}/invite`);
      setInviteLink(`${window.location.origin}/invite/${response.data.token}`);
    } catch (err) {
      setError("Error al generar la invitación.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
    }
  };

  return (
    <div className="fixed top-0 left-0  bg-black bg-opacity-30 flex items-center justify-center z-50 p-2 text-slate-800 w-screen h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Invitar usuario</h2>
          <button onClick={onClose}>
            <X className="size-5" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mt-2">Genera un enlace para invitar a un miembro al {type === "board" ? "tablero" : "Espacio de trabajo"}.</p>


        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          onClick={handleInvite}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <Loader className="size-5 animate-spin" /> : "Generar enlace"}
        </button>

        {inviteLink && (
          <div className="mt-4 bg-gray-100 p-2 rounded-md flex justify-between items-center">
            <span className="text-sm text-gray-700 truncate">{inviteLink}</span>
            <button onClick={handleCopy} className="text-blue-600 hover:text-blue-800">
              <Copy className="size-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
