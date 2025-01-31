import { Navigate } from "react-router";
import {  useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default function WorkspaceRedirect() {
  const { workspaces} = useSelector((state: RootState) => state.workspaces);


  if (workspaces.length === 0) {
    // Redirige a una página que indique que no hay espacios de trabajo disponibles
    return <Navigate to="/no-workspace" replace />;
  }
  
  const  firstWorkspaceId = workspaces[0].id;
  return <Navigate to={`/w/${firstWorkspaceId}/home`} replace />;
}