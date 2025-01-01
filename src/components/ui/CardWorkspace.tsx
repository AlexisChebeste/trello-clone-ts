import {Card} from './Card';

// Usage: <CardWorkspace>...</CardWorkspace>
interface CardWorkspaceProps {
    name: string,
    cantBoards: number
    onClick: () => void
}

export default function CardWorkspace({ name, cantBoards, onClick}: CardWorkspaceProps) {


    return (
        <Card onClick={onClick} name={name}>
            <p className="text-sm text-gray-500 mt-2">
                Tableros: {cantBoards}
            </p>
        </Card>
    )
}