import {Route } from "react-router";
import RoutesWithNotFound from "../../utilities/RoutesWithNotFound";
import { lazy, useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { logout } from "../../redux/states/authSlice";
import { AppDispatch} from "../../redux/store";

const Home = lazy(() => import("./Workspace/Home"));
const WorkspacePage = lazy(() => import("./Workspace/WorkspacePage"));
const MembersPage = lazy(() => import("./Workspace/MembersPage/MembersPage"));
const InvitedWorkspace = lazy(() => import("./Workspace/MembersPage/InvitedWorkspace"));
const SolicitedWorkspace = lazy(() => import("./Workspace/MembersPage/SolicitedWorkspace"));
const MembersWorkspace = lazy(() => import("./Workspace/MembersPage/MembersWorkspace"));
const AccountPage = lazy(() => import("./Workspace/AccountPage"));
const BillingPage = lazy(() => import("./Workspace/BillingPage"));
const Layout = lazy(() => import("../Layout"));
const LayoutAside = lazy(() => import("../../components/LayoutAside"));
const WorkspaceRedirect = lazy(() => import("../Private/Workspace/WorkspaceRedirect"));

function Private(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const checkTokenExpiration = () => {
          const tokenExpiration = localStorage.getItem("tokenExpiration");
          if (tokenExpiration) {
            const currentTime = new Date().getTime();
            if (currentTime >= parseInt(tokenExpiration)) {
              dispatch(logout()); // Cierra la sesión
              localStorage.removeItem("tokenExpiration");
            }
          }
        };
    
        const interval = setInterval(checkTokenExpiration, 5000); // Verifica cada 5 segundos
        return () => clearInterval(interval); // Limpia el intervalo al desmontar
      }, [dispatch]);

  // Si hay workspaces, redirigimos al primer workspace
    return(
        <RoutesWithNotFound>
            <Route path="/" element={<WorkspaceRedirect />}/>
            <Route element={<Layout />}>
                <Route path=":idWorkspace/home" element={<Home />}/>

                <Route path=":idWorkspace" element={<LayoutAside />} >
                    <Route index element={<WorkspacePage />}/>

                    <Route path="members" element={<MembersPage isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}>
                        <Route index element={<MembersWorkspace setIsModalOpen={setIsModalOpen} />}/>
                        <Route path="guests" element={<InvitedWorkspace />}/>
                        <Route path="request" element={< SolicitedWorkspace/>}/>
                    </Route>
                    <Route path="account" element={<AccountPage />}/>
                    <Route path="belling" element={<BillingPage />}/>
                </Route>
                
            </Route>
            
        </RoutesWithNotFound>
    )
}
export default Private;
