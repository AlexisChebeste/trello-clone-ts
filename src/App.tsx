import { Routes, Route} from "react-router";
import Navbar from "./components/Navbar";
import {Home} from "./pages/Home";
import BoardPage from "./pages/BoardPage";
import { useState } from "react";

export default function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
      
        <div className="min-h-screen flex flex-col bg-slate-100 ">
          <Navbar onMenuToggle={toggleMenu}/>
          <Routes>
            <Route path="/" element={<Home  isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />} />
            <Route path="/:workspaceId/board/:id" element={<BoardPage />} />
          </Routes>
        </div>
  )
}
