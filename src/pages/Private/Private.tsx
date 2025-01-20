import { Navigate, Route } from "react-router";
import { PrivateRoutes } from "../../models/routes";
import RoutesWithNotFound from "../../utilities/RoutesWithNotFound";


function Private(){
    return(
        <RoutesWithNotFound>
            <Route path="/" element={<Navigate to={PrivateRoutes.HOME} />} />
            <Route path={PrivateRoutes.HOME} element={<h1>Home</h1>} />
        </RoutesWithNotFound>
    )
}

export default Private;