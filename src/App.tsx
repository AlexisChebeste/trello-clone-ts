import { Routes, Route} from "react-router";
import Navbar from "./components/Navbar";
import {Home} from "./pages/Home";
import BoardPage from "./pages/BoardPage";

export default function App() {

  return (
      
        <div className="min-h-screen flex flex-col bg-slate-100 ">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home  />} />
            <Route path="/:workspaceId/board/:id" element={<BoardPage />} />
          </Routes>
        </div>
  )
}
