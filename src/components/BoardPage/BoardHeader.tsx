import { Ellipsis, UserRoundPlus } from "lucide-react";
import { IBoard } from "../../types";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

interface UserProfile{
    id: string;
    name: string;
    lastname: string;
    email: string;
    avatar: string;
}

interface IBoardHeaderProps {
    board: IBoard;
    setIsModalOpen: (value: boolean) => void;
}

export default function BoardHeader({ board, setIsModalOpen }: IBoardHeaderProps) {
    const [members, setMembers] = useState<UserProfile[]>()
    
    const fetchMembers = async () => {
        try {
            const membersData = await Promise.all(
                board.members.map(async (member) => {
                    const response = await axiosInstance.get(`/user/${member.user}`);
                    return response.data;
                })
            );
            setMembers(membersData);
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch members when component mounts
    useEffect(() => {
        fetchMembers();
    }, [board.members]);

    return(
        <div className={`h-16 bg-black/20 shadow-md backdrop-blur-md flex items-center justify-between pl-8 pr-4`}>
            <h2 className=" text-white text-lg font-bold">{board?.name}</h2>
            <div className="flex gap-2 items-center">
                {members && members.map((member) => (
                    <img
                        key={member.id}
                        src={member.avatar}
                        alt={member.name}
                        className="size-9 rounded-full"
                    />
                ))}   
                <button
                    onClick={() => setIsModalOpen(true)}
                    className={`flex items-center justify-center gap-1 bg-gray-200 hover:bg-gray-100 py-2 px-3 rounded-sm text-slate-700 font-semibold text-sm w-max `}
                >
                    <UserRoundPlus className="size-4"/>
                    <span>Compartir</span>
                </button>
                <button className="text-white hover:bg-white/20  p-2 rounded-md cursor-pointer transition-colors ">
                    <Ellipsis className="size-5 "/>
                </button>
            </div>
        </div>
    )
}