import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { PrivateRoutes, PublicRoutes } from "../models/routes";
import { RootState } from "../redux/store";

interface Props {
    privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = <Navigate replace to={PrivateRoutes.PRIVATE} />;
  

export const AuthGuard = ({privateValidation}: Props) => {
    const userState = useSelector((store: RootState) => store.auth.isAuthenticated);
    return userState ? (
        privateValidation ? (
            PrivateValidationFragment
        ) : (
            PublicValidationFragment
        )
    ): (
        <Navigate replace to={`/${PublicRoutes.LOGIN}`} />
    );
}

export default AuthGuard;