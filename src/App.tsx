import { useState } from "react";
import { Routes, Route,  BrowserRouter as Router, Navigate} from "react-router";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Workspace/Home";
import BoardPage from "./pages/Board/BoardPage";
import WorkspacePage from "./pages/Workspace/WorkspacePage";
import MembersPage from "./pages/Workspace/MembersPage/MembersPage";
import AccountPage from "./pages/Workspace/AccountPage";
import Layout from "./pages/Layout";
import LayoutAside from "./components/LayoutAside";
import InvitedWorkspace from "./pages/Workspace/MembersPage/InvitedWorkspace";
import SolicitedWorkspace from "./pages/Workspace/MembersPage/SolicitedWorkspace";
import MembersWorkspace from "./pages/Workspace/MembersPage/MembersWorkspace";
import BillingPage from "./pages/Workspace/BillingPage";

/* function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = auth.getCurrentUser();
  return user ? <>{children}</> : <Navigate to="/login" />;
} */

export default function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout onMenuToggle={toggleMenu}/>}>
          {/* Rutas del workspace */}
          <Route path="/w/:idWorkspace/home" element={<Home  isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}/>

          <Route path="/w/:idWorkspace" element={<LayoutAside />} >
            <Route index element={<WorkspacePage />}/>
            <Route path="members" element={<MembersPage />}>
              <Route index element={<MembersWorkspace />}/>
              <Route path="guests" element={<InvitedWorkspace />}/>
              <Route path="request" element={< SolicitedWorkspace/>}/>
            </Route>
            <Route path="account" element={<AccountPage />}/>
            <Route path="belling" element={<BillingPage />}/>
          </Route>
          {/* Rutas para ver un board especifico */}
          <Route path="b/:idBoard/:nameBoard" element={<BoardPage />} />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </Router>
  )
}
