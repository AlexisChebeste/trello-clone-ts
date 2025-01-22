import {Route } from "react-router";
import RoutesWithNotFound from "../../utilities/RoutesWithNotFound";
import { lazy } from "react";

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
const WorkspaceRedirect = lazy(() => import("./Workspace/WorkspaceRedirect"));

function Private(){
    return(
        <RoutesWithNotFound>
            <Route path="/" element={<WorkspaceRedirect />} />
            <Route element={<Layout />}>
                <Route path=":idWorkspace/home" element={<Home />}/>

                <Route path=":idWorkspace" element={<LayoutAside />} >
                    <Route index element={<WorkspacePage />}/>

                    <Route path="members" element={<MembersPage />}>
                        <Route index element={<MembersWorkspace />}/>
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
