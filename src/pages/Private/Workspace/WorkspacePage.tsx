import { useParams } from "react-router";
import CardBoard from "../../../components/Home/CardBoard";
import  BoardsHeader  from "../../../components/WorkspacePage/BoardsHeader";
import Addbutton from "../../../components/Boards/Addbutton";
import { WorkspaceInfo } from "../../../components/Boards/WorkspaceInfo";
import { UserRoundPlus } from "lucide-react";
import { useSelector } from "react-redux";
import {RootState } from "../../../redux/store";
import ArchivedBoards from "../../../components/WorkspacePage/ArchivedBoards";
import { useBoards } from "../../../hooks/useBoards";



export default function WorkspacePage() {
    const {idWorkspace} = useParams<{idWorkspace: string}>();

    // Obtener workspaces desde Redux
    const {workspaces} = useSelector((store: RootState) => store.workspaces);
    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);

    // Obtener boards desde Redux
    const { 
      filteredBoards, 
      boardsArchived, 
      sortBy, 
      setSortBy, 
      searchQuery, 
      setSearchQuery, 
      loading 
    } = useBoards(idWorkspace);

    if(!workspace) {
        return <div>El espacio de trabajo no existe</div>
    }
    return(
      <div className=" flex-1 h-full flex flex-col py-4 px-4 md:px-8 max-w-7xl mx-auto w-full  text-gray-500 overflow-y-auto">
        <WorkspaceInfo logo={workspace.logo} name={workspace.name} description={workspace.description} isPublic={workspace.isPublic} >
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
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 rounded-lg bg-gray-200 animate-pulse" />
              ))
            ) : (<>
              <Addbutton remaining={workspace.boards.length} workspaceId={workspace.id}/>
              {filteredBoards.map(board => (
                  <CardBoard key={board.id} board={board} />
            ))}
            </>)}
          </div>
          {!loading && filteredBoards.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
            No se encontraron tableros
            </p>
          )}
        </div>
        <ArchivedBoards boardsArchived={boardsArchived} nameWorkspace={workspace.name} />

      </div> 
                 
    )
}