import AsideWorkspace from "../../components/Home/AsideWorkspace";
import Boards from "../../components/Boards/Boards";


export default function Home() {
    
    

    return (
        <>
            
            <main className=" p-1 sm:p-2 lg:p-3 w-full max-w-7xl   sm:flex gap-2 lg:gap-3 transition-all">
                <AsideWorkspace />
                <div className="p-2 lg:p-6 flex-1">
                    <Boards />
                    
                </div>
            </main>
        </>
        
    )
}