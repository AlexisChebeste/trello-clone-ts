import { User } from "lucide-react";
import { IWorkspace } from "../../types";
import Addbutton from "../Boards/Addbutton";
import CardBoard from "../Home/CardBoard";
import ArchivedBoards from "../WorkspacePage/ArchivedBoards";



export default function WorkspaceContent({workspace}: {workspace: IWorkspace}) {
    const boardsArchived = workspace.boards.filter(board => board.isArchived);

    return(
        <div className="flex flex-col gap-4 ">
            <div className="flex gap-2 items-center">
                <User className="size-6 text-slate-900"/>
                <h3 className="text-lg font-semibold text-slate-900">{workspace.name}</h3>
            </div>
            <div className="relative w-full grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 justify-items-stretch gap-2 lg:gap-4 ">
                {workspace.boards.map((board) => (
                    <CardBoard key={board.id} board={board} />
                ))}
                <Addbutton remaining={workspace.boards.length} workspaceId={workspace.id}/>
                
            </div>
            <ArchivedBoards boardsArchived={boardsArchived} nameWorkspace={workspace.name}/>
            
            
        </div>
    )
}