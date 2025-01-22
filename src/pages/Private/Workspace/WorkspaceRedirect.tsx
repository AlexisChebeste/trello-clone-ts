import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../../redux/store";
import { useEffect } from "react";
import { getWorkspacesFailure, getWorkspacesStart, getWorkspacesSuccess } from "../../../redux/states/workspaceSlices";
import { mockGetWorkspace } from "../../../mockApi";

export default function WorkspaceRedirect() {
  const dispatch = useDispatch();
    const { workspaces} = useSelector((state: AppStore) => state.workspace);

  useEffect(() => {
        dispatch(getWorkspacesStart());
        try {
        const mockWorkspaces = [mockGetWorkspace('1'), mockGetWorkspace('2'), mockGetWorkspace('3')]; // Simula que obtenemos los workspaces
        dispatch(getWorkspacesSuccess(mockWorkspaces));
        } catch (e) {
        dispatch(getWorkspacesFailure('Error al cargar los workspaces'));
        }
    }, [dispatch]);

  if (workspaces.length === 0) {
    // Redirige a una página que indique que no hay espacios de trabajo disponibles
    return <Navigate to="/no-workspace" replace />;
  }

  // Redirige al primer espacio de trabajo
  const firstWorkspaceId = workspaces[0].id;
  return <Navigate to={`/w/${firstWorkspaceId}/home`} replace />;
}