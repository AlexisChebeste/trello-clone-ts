import { Routes, Route, Navigate, useLocation} from "react-router";
import Navbar from "./components/Navbar";
import {Home} from "./pages/Home";
import BoardPage from "./pages/BoardPage";
import { useState } from "react";
import { auth } from "./lib/auth";
import Login from "./pages/Login";
import { useColor } from "./hooks/useColor";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = auth.getCurrentUser();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

export default function App() {
  const location = useLocation();
  const {color} = useColor();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  

  return (
      
        <div className={`min-h-screen w-screen ${location.pathname.includes("board") && color} flex flex-col overflow-hidden items-center`}>
          {location.pathname !== "/login" && <Navbar onMenuToggle={toggleMenu}/>}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" 
              element={
                <PrivateRoute>
                  <Home  isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/:workspaceId/board/:id" 
              element={
                <PrivateRoute>
                  <BoardPage />
                </PrivateRoute>
                } />
          </Routes>
        </div>
  )
}
