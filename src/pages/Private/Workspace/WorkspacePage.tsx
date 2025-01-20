import { useParams } from "react-router";
import { useWorkspace } from "../../../hooks/useWorkspace";
import CardBoard from "../../../components/Home/CardBoard";
import { useCallback, useEffect, useRef, useState } from "react";
import { Board} from "../../../types";
import  BoardsHeader  from "../../../components/WorkspacePage/BoardsHeader";
import Addbutton from "../../../components/Boards/Addbutton";
import ModalBoard from "../../../components/modals/AddBoard/ModalBoard";
import ButtonWorkspace from "../../../components/ButtonWorkspace";
import { WorkspaceInfo } from "../../../components/Boards/WorkspaceInfo";
import { UserRoundPlus } from "lucide-react";
import ModalArchived from "../../../components/WorkspacePage/ModalArchived";



export default function WorkspacePage() {
    const {idWorkspace} = useParams<{idWorkspace: string}>();
    const {workspaces} = useWorkspace();
    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isArchivedModalOpen, setIsArchivedModalOpen] = useState(false);
    const [boards, setBoards] = useState<Board[]>([])
    const [sortBy, setSortBy] = useState<string>('most-recent')
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const buttonRef = useRef<HTMLButtonElement>(null); 
    const handleCloseModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    const handleOpenModal = () => {
        setIsModalOpen(!isModalOpen);
        
    };

    const handleModalArchived = () => {
      setIsArchivedModalOpen(!isArchivedModalOpen);
    }

    async function getBoards(sortBy: string = 'most-recent'): Promise<Board[]> {
        // Simulate DB delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        return [...(workspace?.boards || [])].sort((a, b) => {
          switch (sortBy) {
            case 'most-recent':
              return (b.lastActive?.getTime() ?? 0) - (a.lastActive?.getTime() ?? 0)
            case 'least-recent':
              return (a.lastActive?.getTime() ?? 0) - (b.lastActive?.getTime() ?? 0)
            case 'a-z':
              return a.name.localeCompare(b.name)
            case 'z-a':
              return b.name.localeCompare(a.name)
            default:
              return 0
          }
        })
      }


    const fetchBoards = useCallback(async () => {
        setIsLoading(true)
        try {
          const data = await getBoards(sortBy)
          setBoards(data)
        } finally {
          setIsLoading(false)
        }
      }, [workspace?.boards, sortBy])
    
      useEffect(() => {
        fetchBoards()
      }, [fetchBoards])
      
    const filteredBoards = boards.filter(board => 

      (board.isArchived === false) && 
           board.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    
    const boardsArchived = boards.filter(board => 
      board.isArchived === true
    )

    if(!workspace) {
        return <div>El espacio de trabajo no existe</div>
    }
    return(
      <div className=" flex-1 h-full flex flex-col py-4 px-4 md:px-8 max-w-7xl mx-auto w-full  text-gray-500 overflow-y-auto">
        <WorkspaceInfo logo={workspace.logo} name={workspace.name} description={workspace.description}>
            <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md flex items-center font-semibold max-w-max gap-2  hover:bg-blue-700 transition-colors duration-200">
                <UserRoundPlus  />
                Invitar a miembros del espacio de trabajo
            </button>
        </WorkspaceInfo>
                
                    
                
        <div className="mt-6 flex flex-col gap-4">
          <BoardsHeader 
            sortBy={sortBy}
            searchQuery={searchQuery}
            onSortChange={setSortBy}
            onSearchChange={setSearchQuery}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 rounded-lg bg-gray-200 animate-pulse" />
              ))
            ) : (<>
              <Addbutton buttonRef={buttonRef} onClick={handleOpenModal} remaining={workspace.boards.length}/>
              {filteredBoards.map(board => (
                  <CardBoard key={board.id} board={board} />
            ))}
            </>)}
          </div>
          {!isLoading && filteredBoards.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
            No se encontraron tableros
            </p>
          )}
        </div>
        <div className={`w-full flex justify-center ${boardsArchived.length === 0   ? 'hidden' : 'block'}`}>
          <ButtonWorkspace 
            className="mt-4"
            onClick={handleModalArchived}
          >
            Ver los tableros cerrados
          </ButtonWorkspace>
          <ModalArchived isModalOpen={isArchivedModalOpen} setIsModalOpen={setIsArchivedModalOpen} boardsArchived={boardsArchived} workName={workspace.name}/>
        </div>
        
        <ModalBoard
          workspaceId={workspace.id}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          buttonRef={buttonRef}
          aria-labelledby="modal-title" // Asociar el modal con un título
          aria-hidden={!isModalOpen ? "true" : "false"} // Asegúrate de que el contenido detrás del modal esté oculto
        />
      </div> 
                 
    )
}