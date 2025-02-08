import { Pencil, X } from "lucide-react";
import { ICard } from "../../../types";
import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { deleteCard } from "../../../redux/states/cardsSlice";

interface UserProfile {
    id: string;
    name: string;
    lastname: string;
    email: string;
    avatar: string;
}

interface ModalCardProps {
  card: ICard;
  setIsOpened: (value: boolean) => void;
  handleBlur: () => void;
}


export default function ModalCard({ card, setIsOpened , handleBlur}: ModalCardProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [cardName, setCardName] = useState(card.title);
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(card.description || "");

    const [activityUsers, setActivityUsers] = useState<Record<string, UserProfile>>({});

    useEffect(() => {
        const fetchUsers = async () => {
        const userIds = Array.from(new Set(card.activity.map((a) => a.user))); // Obtener IDs únicos
        const userPromises = userIds.map(async (userId) => {
            const response = await axiosInstance.get<UserProfile>(`/user/${userId}`);
            return { userId, userProfile: response.data };
        });

        const usersData = await Promise.all(userPromises);
        const usersMap: Record<string, UserProfile> = {};
        usersData.forEach(({ userId, userProfile }) => {
            usersMap[userId] = userProfile;
        });

        setActivityUsers(usersMap);
        };

        fetchUsers();
    }, [card.activity]);

    addEventListener('click', (e) => {
        const bgModal = document.getElementById('bg-modal')
        const modalCard = document.getElementById('modal-card')
        const titleEdit = document.getElementById('title-edit')
        if(bgModal && modalCard){
            if(e.target === bgModal){
                setIsOpened(false)
            }
        }
        if(titleEdit){
            if(e.target !== titleEdit){
                setIsEditing(false)
            }
        }
    })

    const delCard = async () => {
        await dispatch(deleteCard(card.id));
        setIsOpened(false);
    }

    return (
        <div id="bg-modal" className="fixed inset-0 overflow-y-auto bg-black bg-opacity-30 flex items-center justify-center z-50 p-2 text-slate-800">
            <div id="modal-card" className="bg-gray-100 p-6 rounded-lg w-full max-w-3xl relative shadow-lg">
                {/* Botón de cierre */}
                <button 
                className="absolute top-4 right-4 text-slate-600 hover:text-gray-800"
                onClick={() => setIsOpened(false)}
                >
                <X className="size-6" />
                </button>

                {/* Título editable */}
                <div  className="flex items-center gap-2 text-xl font-semibold text-slate-800 mb-4 h-10 min-w-96 w-max">
                {isEditing ? (
                    <input
                        id="title-edit"
                        className="flex items-center rounded-md p-1  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        value={cardName}
                        onBlur={handleBlur}
                        onChange={(e) => setCardName(e.target.value)}
                        autoFocus
                    />
                ) : (
                    <button 
                    className="p-1 h-10 flex items-center gap-2"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(true);
                    }}
                    >
                        <span >
                            {cardName}
                        </span>
                        <Pencil className="size-4" />
                    </button>
                    
                )}
                </div>

                {/* Descripción */}
                <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                <textarea
                    className="w-full min-h-24  p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Añadir una descripción más detallada..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </div>

                {/* Actividad */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-3">Actividad</h2>
                    <input
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    placeholder="Escribe un comentario..."
                />
                </div>
                <div className="flex flex-col gap-3 mt-4">
                    {card.activity.map((entry, index) => {
                        const user = activityUsers[entry.user];
                        return (
                            <div key={index} className="flex items-start space-x-3">
                                <img 
                                    src={user?.avatar || "https://via.placeholder.com/40"} 
                                    alt="avatar"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-sm">
                                    <span className="font-semibold text-slate-800">{user ? `${user.name} ${user.lastname}` : "Cargando..."}</span> {entry.action}
                                    </p>
                                    <p className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Botones */}
                <div className="flex justify-end mt-6">
                    <button className="py-2 px-3 bg-white rounded-md border border-gray-500 font-semibold hover:bg-slate-100 transition-colors" onClick={delCard}>
                        Borrar tarjeta
                    </button>
                </div>
            </div>
        </div>
    );
}
