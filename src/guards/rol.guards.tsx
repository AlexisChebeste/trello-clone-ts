import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import { AppStore } from '../redux/store';
import { Roles } from '../models/roles';
import { PrivateRoutes } from '../models/routes';

interface Props {
  rol: Roles;
}

function RoleGuard({ rol }: Props) {
  const userState = useSelector((store: AppStore) => store.user);
  return userState.rol === rol ? <Outlet /> : <Navigate replace to={PrivateRoutes.PRIVATE} />;
}
export default RoleGuard;