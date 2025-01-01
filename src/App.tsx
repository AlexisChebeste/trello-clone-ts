import { Routes, Route} from "react-router";
import Navbar from "./components/Navbar";
import {Home} from "./pages/Home";
import BoardPage from "./pages/BoardPage";
import { useWorkspace } from "./hooks/useWorkspace";

export default function App() {
  const {workspaces} = useWorkspace();

  return (
      
        <div className="min-h-screen flex flex-col bg-slate-100 ">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home  />} />
            <Route path="/:workspaceId/board/:id" element={<BoardPage workspace={workspaces} />} />
          </Routes>
        </div>
  )
}
