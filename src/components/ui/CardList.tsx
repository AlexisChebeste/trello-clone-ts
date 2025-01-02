import { useState } from "react";
import { List } from "../../types"
import ButtonAdd from "./ButtonAdd"
import ModalCard from "../modals/ModalCard";
import { Card } from "./Card";

interface CardListProps{
    list: List
}

export default function CardList({list}: CardListProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };


    return (
        <div className='flex flex-col items-start gap-4 p-4 min-w-80 max-w-96 w-full h-full rounded-lg bg-white' key={list.id}>
            <h2 className='text-xl my-2 font-semibold'>{list.title}</h2>           
            <div className='flex flex-col gap-4 w-full'>
                {list?.cards.map((card) => (
                    <Card key={card.id} title={card.title} />
                ))}
                <ButtonAdd 
                    className="h-14"
                    onClick={handleOpenModal} 
                    title='tarjeta' 
                />
            </div>        
            {isModalOpen && list && (
                <ModalCard listId={list.id} isOpen={isModalOpen} onClose={handleCloseModal} />
            )}   
        </div>
    )
}